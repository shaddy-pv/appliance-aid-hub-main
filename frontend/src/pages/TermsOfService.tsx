import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-8">Last Updated: December 1, 2024</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Appliance Aid Hub's services, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Appliance Aid Hub provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Home appliance repair and maintenance services</li>
                <li>Sale of genuine spare parts and accessories</li>
                <li>Online booking and scheduling platform</li>
                <li>Customer support and consultation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                Failure to do so constitutes a breach of the Terms.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You are responsible for safeguarding your password</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>You may not use another user's account without permission</li>
                <li>We reserve the right to refuse service or terminate accounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Booking and Scheduling</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Service bookings are subject to availability and confirmation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Booking requests are not confirmed until you receive confirmation from us</li>
                <li>We reserve the right to refuse or cancel bookings</li>
                <li>Service times are estimates and may vary based on circumstances</li>
                <li>You must provide accurate address and contact information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Prices are subject to change without notice</li>
                <li>Payment is required at the time of booking or service completion</li>
                <li>We accept payments via credit/debit cards, UPI, and other digital methods</li>
                <li>Additional charges may apply for parts or extended services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cancellation terms vary by service type:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Cancellations made 24 hours before scheduled service: Full refund</li>
                <li>Cancellations made 12-24 hours before: 50% refund</li>
                <li>Cancellations made less than 12 hours before: No refund</li>
                <li>We may cancel services due to unforeseen circumstances with full refund</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Warranty</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We provide warranty on our services and parts:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>30-day warranty on all repair services</li>
                <li>90-day warranty on replaced parts</li>
                <li>Warranty void if tampered by unauthorized persons</li>
                <li>Warranty does not cover misuse or accidental damage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Appliance Aid Hub shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly 
                or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The service and its original content, features, and functionality are and will remain the exclusive property 
                of Appliance Aid Hub. The service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its 
                conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of courts in [Your City].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes 
                by posting the new Terms on this page. Your continued use of the service after any changes constitutes 
                acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-700"><strong>Email:</strong> legal@applianceaidhub.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 98765 43210</p>
                <p className="text-gray-700"><strong>Address:</strong> [Your Business Address]</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
