export const metadata = { title: "Terms of Service" };

const sections = [
  ["Using the platform", "You agree to use Apna University for learning purposes and to give correct information."],
  ["Accounts", "You are responsible for keeping your password safe and for all activity on your account."],
  ["Content", "Course materials belong to Apna University and its instructors. Do not copy or resell them."],
  ["Payments and refunds", "Fees are shown on the pricing page. Refund requests are reviewed within 7 days of payment."],
  ["Changes", "We may update these terms. Continued use of the platform means you accept the changes."],
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      {sections.map(([h, t]) => (
        <section key={h} className="mt-6">
          <h2 className="text-xl font-semibold">{h}</h2>
          <p className="mt-1 text-slate-600">{t}</p>
        </section>
      ))}
    </div>
  );
}
