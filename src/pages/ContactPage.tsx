import {
  TextInput,
  Textarea,
  Group,
  Paper,
} from "@mantine/core";
import Button from "../components/ui/Button";

const ContactPage = () => {
  return (
    <section className="py-20 px-4 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left: Info Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions, feedback, or need
            help? Reach out to us and our team
            will get back to you within 24 hours.
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-800">
                Email
              </h4>
              <p>support@yourapp.in</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                Phone
              </h4>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                Office
              </h4>
              <p>
                101, Tech Park Avenue,
                <br />
                Bengaluru, Karnataka – 560001
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          className="bg-white"
        >
          <form className="space-y-6">
            <TextInput
              label="Your Name"
              placeholder="Enter your full name"
              required
            />
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              type="email"
              required
            />
            <Textarea
              label="Message"
              placeholder="Write your message here"
              minRows={5}
              autosize
              required
            />
            <Group justify="flex-end">
              <Button
                type="submit"
                radius="xl"
              >
                Send Message
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </section>
  );
};

export default ContactPage;
