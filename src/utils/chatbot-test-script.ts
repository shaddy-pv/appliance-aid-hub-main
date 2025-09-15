// Chatbot Test Script - Automated testing utilities
import { sendMessageToGemini } from '@/lib/gemini-api';
import { sendMessageToMockBot } from '@/lib/mock-chatbot';
import { testData } from '@/data/test-data';

export interface TestResult {
  scenario: string;
  userMessage: string;
  expectedResponse: string;
  actualResponse: string;
  success: boolean;
  responseTime: number;
  error?: string;
}

export class ChatbotTester {
  private results: TestResult[] = [];

  /**
   * Run all test scenarios
   */
  async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Starting Chatbot Test Suite...');
    
    // Test mock bot
    await this.testMockBot();
    
    // Test Gemini API
    await this.testGeminiAPI();
    
    // Test error scenarios
    await this.testErrorScenarios();
    
    console.log('✅ Test Suite Complete!');
    console.log(`📊 Results: ${this.results.length} tests run`);
    console.log(`✅ Passed: ${this.results.filter(r => r.success).length}`);
    console.log(`❌ Failed: ${this.results.filter(r => !r.success).length}`);
    
    return this.results;
  }

  /**
   * Test mock bot responses
   */
  private async testMockBot(): Promise<void> {
    console.log('🤖 Testing Mock Bot...');
    
    for (const scenario of testData.chatScenarios.slice(0, 3)) {
      const startTime = Date.now();
      
      try {
        const response = await sendMessageToMockBot(scenario.userMessage);
        const responseTime = Date.now() - startTime;
        
        this.results.push({
          scenario: `Mock Bot - ${scenario.title}`,
          userMessage: scenario.userMessage,
          expectedResponse: scenario.expectedResponse,
          actualResponse: response,
          success: true,
          responseTime
        });
        
        console.log(`✅ Mock Bot - ${scenario.title}: ${responseTime}ms`);
      } catch (error) {
        this.results.push({
          scenario: `Mock Bot - ${scenario.title}`,
          userMessage: scenario.userMessage,
          expectedResponse: scenario.expectedResponse,
          actualResponse: '',
          success: false,
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        console.log(`❌ Mock Bot - ${scenario.title}: ${error}`);
      }
    }
  }

  /**
   * Test Gemini API responses
   */
  private async testGeminiAPI(): Promise<void> {
    console.log('🤖 Testing Gemini API...');
    
    for (const scenario of testData.chatScenarios.slice(0, 3)) {
      const startTime = Date.now();
      
      try {
        const response = await sendMessageToGemini(scenario.userMessage);
        const responseTime = Date.now() - startTime;
        
        this.results.push({
          scenario: `Gemini API - ${scenario.title}`,
          userMessage: scenario.userMessage,
          expectedResponse: scenario.expectedResponse,
          actualResponse: response,
          success: true,
          responseTime
        });
        
        console.log(`✅ Gemini API - ${scenario.title}: ${responseTime}ms`);
      } catch (error) {
        this.results.push({
          scenario: `Gemini API - ${scenario.title}`,
          userMessage: scenario.userMessage,
          expectedResponse: scenario.expectedResponse,
          actualResponse: '',
          success: false,
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        console.log(`❌ Gemini API - ${scenario.title}: ${error}`);
      }
    }
  }

  /**
   * Test error scenarios
   */
  private async testErrorScenarios(): Promise<void> {
    console.log('⚠️ Testing Error Scenarios...');
    
    // Test with empty message
    try {
      await sendMessageToMockBot('');
      console.log('❌ Empty message should fail');
    } catch (error) {
      console.log('✅ Empty message properly rejected');
    }
    
    // Test with very long message
    const longMessage = 'a'.repeat(10000);
    try {
      const response = await sendMessageToMockBot(longMessage);
      console.log('✅ Long message handled gracefully');
    } catch (error) {
      console.log('❌ Long message failed unexpectedly');
    }
  }

  /**
   * Get test results summary
   */
  getSummary(): {
    total: number;
    passed: number;
    failed: number;
    averageResponseTime: number;
    successRate: number;
  } {
    const total = this.results.length;
    const passed = this.results.filter(r => r.success).length;
    const failed = total - passed;
    const averageResponseTime = this.results.reduce((sum, r) => sum + r.responseTime, 0) / total;
    const successRate = (passed / total) * 100;

    return {
      total,
      passed,
      failed,
      averageResponseTime: Math.round(averageResponseTime),
      successRate: Math.round(successRate * 100) / 100
    };
  }

  /**
   * Export results to JSON
   */
  exportResults(): string {
    return JSON.stringify({
      summary: this.getSummary(),
      results: this.results,
      timestamp: new Date().toISOString()
    }, null, 2);
  }
}

// Quick test functions for manual testing
export const quickTests = {
  /**
   * Test a single message with mock bot
   */
  async testMockMessage(message: string): Promise<string> {
    console.log(`🤖 Testing mock bot with: "${message}"`);
    const startTime = Date.now();
    
    try {
      const response = await sendMessageToMockBot(message);
      const responseTime = Date.now() - startTime;
      console.log(`✅ Response (${responseTime}ms): ${response}`);
      return response;
    } catch (error) {
      console.log(`❌ Error: ${error}`);
      throw error;
    }
  },

  /**
   * Test a single message with Gemini API
   */
  async testGeminiMessage(message: string): Promise<string> {
    console.log(`🤖 Testing Gemini API with: "${message}"`);
    const startTime = Date.now();
    
    try {
      const response = await sendMessageToGemini(message);
      const responseTime = Date.now() - startTime;
      console.log(`✅ Response (${responseTime}ms): ${response}`);
      return response;
    } catch (error) {
      console.log(`❌ Error: ${error}`);
      throw error;
    }
  },

  /**
   * Test common appliance repair questions
   */
  async testCommonQuestions(): Promise<void> {
    const questions = [
      "My AC is not cooling properly",
      "What are your service charges?",
      "I want to book a service",
      "Do you provide emergency service?",
      "What warranty do you offer?"
    ];

    console.log('🧪 Testing common questions...');
    
    for (const question of questions) {
      try {
        await this.testMockMessage(question);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      } catch (error) {
        console.log(`❌ Failed to test: ${question}`);
      }
    }
  }
};

// Export the tester class
export const chatbotTester = new ChatbotTester();

// Example usage:
// const results = await chatbotTester.runAllTests();
// console.log(chatbotTester.getSummary());
// console.log(chatbotTester.exportResults());
