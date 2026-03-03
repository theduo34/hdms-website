export default function SectionSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4 px-6 py-12">
      <div className="h-8 w-1/3 rounded-lg bg-gray-200" />
      <div className="h-4 w-2/3 rounded-lg bg-gray-200" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-48 rounded-xl bg-gray-200" />
        <div className="h-48 rounded-xl bg-gray-200" />
        <div className="h-48 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}