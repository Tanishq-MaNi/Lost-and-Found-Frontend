import { useState } from "react";
import { Download, Filter, MapPin, Search } from "lucide-react";

import SectionTitle from "../../components/common/SectionTitle";
import ActionButton from "../../components/common/ActionButton";
import Badge from "../../components/common/Badge";
import { useAdminData } from "../../context/AdminDataContext";
import { useToast } from "../../context/ToastContext";

const statusOptions = ["All", "Pending", "Verified", "Rejected", "Resolved"];

const Reports = ({ status, title = "All Reports" }) => {
  const { reports, updateReport } = useAdminData();
  const { notify } = useToast();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // A fixed status (Pending Reports page) overrides the dropdown.
  const activeFilter = status || filter;

  const visibleReports = reports.filter((report) => {
    const matchesStatus =
      activeFilter === "All" || report.status === activeFilter;
    const matchesSearch = [report.code, report.item, report.owner, report.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const count = (s) => reports.filter((r) => r.status === s).length;

  return (
    <>
      <SectionTitle
        title={title}
        description="Review and manage reports submitted by students."
        action={
          <button
            onClick={() => notify("Connect your report export API.")}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#35404e] px-4 py-3 text-sm hover:bg-[#19222e]"
          >
            <Download size={16} /> Export
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#26303d] bg-[#111720] p-4">
          <p className="text-sm text-slate-400">Total reports</p>
          <p className="mt-2 text-2xl font-semibold text-white">{reports.length}</p>
        </div>
        <div className="rounded-xl border border-[#26303d] bg-[#111720] p-4">
          <p className="text-sm text-slate-400">Pending review</p>
          <p className="mt-2 text-2xl font-semibold text-amber-400">{count("Pending")}</p>
        </div>
        <div className="rounded-xl border border-[#26303d] bg-[#111720] p-4">
          <p className="text-sm text-slate-400">Verified</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-400">{count("Verified")}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#26303d] bg-[#111720]">
        <div className="flex flex-col gap-3 border-b border-[#26303d] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-[#35404e] bg-[#151d28] px-3 sm:w-72">
            <Search size={15} className="shrink-0 text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {!status && (
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-[#35404e] bg-[#151d28] px-3 py-2 text-sm text-white outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All statuses" : option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead className="bg-[#151d28] text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Report</th>
                <th className="px-5 py-4 font-medium">Location</th>
                <th className="px-5 py-4 font-medium">Reporter</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26303d]">
              {visibleReports.map((report) => (
                <tr key={report.code} className="hover:bg-white/2">
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{report.item}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {report.code} · {report.type} · {report.category}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} /> {report.location}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-300">{report.owner}</td>
                  <td className="px-5 py-4 text-slate-400">{report.date}</td>
                  <td className="px-5 py-4">
                    <Badge>{report.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {report.status === "Pending" && (
                        <>
                          <ActionButton onClick={() => updateReport(report.id, "Verified")}>
                            Verify
                          </ActionButton>
                          <ActionButton danger onClick={() => updateReport(report.id, "Rejected")}>
                            Reject
                          </ActionButton>
                        </>
                      )}
                      {report.status === "Verified" && (
                        <ActionButton onClick={() => updateReport(report.id, "Resolved")}>
                          Mark resolved
                        </ActionButton>
                      )}
                      {(report.status === "Rejected" ||
                        report.status === "Resolved") && (
                        <span className="text-xs text-slate-600">No actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleReports.length === 0 && (
            <p className="p-10 text-center text-sm text-slate-500">
              No reports match your search or filter.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;