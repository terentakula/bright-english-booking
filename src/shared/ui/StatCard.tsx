type StatCardProps = {
  label: string;
  value: string | number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
      <p className="mb-2 text-sm font-semibold text-brand-brown/75">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
