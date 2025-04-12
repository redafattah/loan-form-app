export default function LoanFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />

      <div className="grid gap-4">
        <div className="h-12 bg-gray-100 rounded" />
        <div className="h-12 bg-gray-100 rounded" />
        <div className="h-12 bg-gray-100 rounded" />
      </div>

      <div className="flex gap-4 mt-6">
        <div className="h-10 w-24 bg-gray-200 rounded-full" />
        <div className="h-10 w-32 bg-blue-200 rounded-full" />
      </div>
    </div>
  );
}
