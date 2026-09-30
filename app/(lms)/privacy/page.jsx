export const metadata = { title: "Privacy Policy" };

const sections = [
  ["Information we collect", "We collect your name, email, phone number and messages when you use our contact form or create an account."],
  ["How we use it", "We use your information to answer your questions, manage your account and improve our services."],
  ["Sharing", "We do not sell your data. We share it only with service providers such as Firebase who help us run the platform."],
  ["Your rights", "You can ask us to view, correct or delete your data at any time by contacting us."],
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      {sections.map(([h, t]) => (
        <section key={h} className="mt-6">
          <h2 className="text-xl font-semibold">{h}</h2>
          <p className="mt-1 text-slate-600">{t}</p>
        </section>
      ))}
    </div>
  );
}
