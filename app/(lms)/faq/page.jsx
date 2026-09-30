export const metadata = { title: "FAQ" };

const faqs = [
  ["How do I apply?", "Fill in the contact form or visit the admission office. We will guide you through the documents and fees."],
  ["Are scholarships available?", "Yes. Merit-based and need-based scholarships are offered every semester."],
  ["Can I study online?", "Selected courses are available online with live classes and recorded lectures."],
  ["Do you help with jobs?", "Our career center arranges internships, job fairs, CV workshops and mock interviews."],
  ["How can I pay the fee?", "You can pay by bank transfer, online payment or in installments."],
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Frequently asked questions</h1>
      <div className="mt-6 divide-y rounded-xl border bg-white">
        {faqs.map(([q, a]) => (
          <details key={q} className="group p-4">
            <summary className="cursor-pointer font-medium">{q}</summary>
            <p className="mt-2 text-sm text-slate-600">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
