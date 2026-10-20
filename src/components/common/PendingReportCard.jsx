export default function PendingReportCard({
  report,
  onApprove,
  onReject,
}) {
  const image = report?.images?.[0]?.url;

  return (
    <div className="bg-[#141B26] p-3 rounded-xl">
      <div className="flex items-start gap-4">

        <div className="h-24 w-24 overflow-hidden rounded-xl">
          {image ? (
            <img
              src={image}
              alt={report.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#252b32]">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">
            {report.title}
          </h3>

          <p className="text-gray-400">
            {report.type} • {report.location}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            {report.description}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() =>
            onApprove(report._id)
          }
          className="rounded-lg bg-green-600 p-2"
        >
          Approve
        </button>

        <button
          onClick={() =>
            onReject(report._id)
          }
          className="rounded-lg bg-red-600 p-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
}