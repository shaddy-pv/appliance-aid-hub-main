import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-gray-500 mb-8">Last Updated: December 1, 2024</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                At Appliance Aid Hub, we strive to provide excellent service and customer satisfaction. This Refund Policy 
                outlines the circumstances under which refunds may be issued for our services and products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Refunds</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Cancellation Before Service</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>24+ hours before:</strong> 100% refund</li>
                <li><strong>12-24 hours before:</strong> 50% refund</li>
                <li><strong>Less than 12 hours:</strong> No refund</li>
                <li><strong>No-show:</strong> No refund</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Service Not Completed</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If we are unable to complete the service due to reasons on our end:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>100% refund will be issued within 5-7 business days</li>
                <li>Option to reschedule at no additional cost</li>
                <li>Compensation may be offered for inconvenience</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Unsatisfactory Service</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you're not satisfied with the service quality:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Report within 24 hours of service completion</li>
                <li>We will re-inspect and attempt to resolve the issue</li>
                <li>Partial or full refund may be issued based on assessment</li>
                <li>Free re-service may be offered as an alternative</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Product Refunds</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Return Window</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Products can be returned within 7 days of delivery</li>
                <li>Product must be unused and in original packaging</li>
                <li>All accessories and documentation must be included</li>
                <li>Return shipping costs may apply</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Defective Products</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For defective or damaged products:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Report within 48 hours of delivery</li>
                <li>Provide photos/videos of the defect</li>
                <li>Free replacement or full refund</li>
                <li>We cover return shipping costs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 Wrong Product Delivered</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Report within 48 hours of delivery</li>
                <li>We will arrange pickup at no cost</li>
                <li>Correct product will be shipped immediately</li>
                <li>Full refund if correct product unavailable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Non-Refundable Items</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following are not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Services already completed to satisfaction</li>
                <li>Products damaged due to misuse or negligence</li>
                <li>Products without original packaging or accessories</li>
                <li>Customized or special-order products</li>
                <li>Diagnostic charges (if service declined after diagnosis)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Process</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.1 How to Request</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
                <li>Contact our customer support via phone or email</li>
                <li>Provide your order number and reason for refund</li>
                <li>Submit any required documentation (photos, etc.)</li>
                <li>Wait for approval from our team</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Processing Time</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Refund requests reviewed within 2-3 business days</li>
                <li>Approved refunds processed within 5-7 business days</li>
                <li>Refund credited to original payment method</li>
                <li>Bank processing may take additional 3-5 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partial Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Partial refunds may be granted in cases such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Service partially completed</li>
                <li>Minor defects in products</li>
                <li>Products returned without original packaging</li>
                <li>Late cancellations (as per cancellation policy)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Exchanges</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer exchanges for products:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Exchange within 7 days of delivery</li>
                <li>Product must be unused and in original condition</li>
                <li>Subject to availability of replacement product</li>
                <li>Price difference may apply for different models</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Warranty vs Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please note the difference:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Warranty:</strong> Covers defects for 30-90 days after service/purchase</li>
                <li><strong>Refund:</strong> Money back for cancelled or unsatisfactory service/product</li>
                <li>Warranty claims do not automatically qualify for refunds</li>
                <li>Free repair/replacement offered under warranty first</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you disagree with our refund decision:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Request escalation to senior management</li>
                <li>Provide additional evidence if available</li>
                <li>We will review within 3-5 business days</li>
                <li>Final decision will be communicated in writing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact for Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To request a refund or for any questions:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-700"><strong>Email:</strong> refunds@applianceaidhub.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 98765 43210</p>
                <p className="text-gray-700"><strong>Hours:</strong> Monday-Saturday, 9 AM - 7 PM</p>
                <p className="text-gray-700 mt-3"><strong>Required Information:</strong></p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Order number</li>
                  <li>Date of service/purchase</li>
                  <li>Reason for refund request</li>
                  <li>Supporting documentation (if applicable)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <p className="text-gray-600 italic">
                This refund policy is designed to be fair to both our customers and our business. We reserve the right 
                to modify this policy at any time. Changes will be effective immediately upon posting on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
