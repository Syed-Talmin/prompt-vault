import { toast } from "react-toastify";
import api from "../axios/axios";
import { FileJson, FileText, FileDown } from "lucide-react";

const ExportButtons = () => {
  const handleExport = async (type) => {
    try {
      const response = await api.get(`/export/prompts/${type}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const filename =
        type === "json"
          ? "prompts.json"
          : type === "pdf"
          ? "prompts.pdf"
          : "prompts.md";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to export prompts.");
    }
  };

  return (
    <div className="flex gap-4 items-start justify-center">
      <button
        onClick={() => handleExport("json")}
        className="flex items-center gap-2 bg-[#0A0A0A]/80 border border-green-600 
               px-5 py-2.5 rounded-xl text-green-400 font-medium 
               hover:bg-green-600/20 hover:text-green-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.8)] 
               transition-all duration-200"
      >
        <FileJson size={18} />
        JSON
      </button>

      <button
        onClick={() => handleExport("pdf")}
        className="flex items-center gap-2 bg-[#0A0A0A]/80 border border-green-600 
               px-5 py-2.5 rounded-xl text-green-400 font-medium 
               hover:bg-green-600/20 hover:text-green-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.8)] 
               transition-all duration-200"
      >
        <FileText size={18} />
        PDF
      </button>

      <button
        onClick={() => handleExport("notion")}
        className="flex items-center gap-2 bg-[#0A0A0A]/80 border border-green-600 
               px-5 py-2.5 rounded-xl text-green-400 font-medium 
               hover:bg-green-600/20 hover:text-green-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.8)] 
               transition-all duration-200"
      >
        <FileDown size={18} />
        Markdown
      </button>
    </div>
  );
};

export default ExportButtons;
