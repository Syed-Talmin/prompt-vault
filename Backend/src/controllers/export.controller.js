import promptModel from "../models/prompt.model.js";
import PDFDocument from "pdfkit";

export const jsonExportController = async (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=prompts.json");
  res.setHeader("Content-Type", "application/json");
  const prompts = await promptModel.find({ owner: req.user._id });
  const exportedData = prompts.map((prompt) => ({
    title: prompt.title,
    content: prompt.content,
    tags: prompt.tags,
    category: prompt.category,
  }));
  res.send(JSON.stringify(exportedData, null, 2));
};

export const pdfExportController = async (req, res) => {
  
  const doc = new PDFDocument();
  res.setHeader("Content-Disposition", "attachment; filename=prompts.pdf");
  res.setHeader("Content-Type", "application/pdf");
  const prompts = await promptModel.find({ owner: req.user._id });

  doc.pipe(res);

  doc
    .fontSize(18)
    .text("Exported Prompts", { align: "center", underline: true });
  doc.moveDown();

  prompts.forEach((p, index) => {
    doc.fontSize(14).text(`${index + 1}. ${p.title}`, { bold: true });
    doc.fontSize(12).text(`Content: ${p.content}`);
    doc.fontSize(10).text(`Tags: ${p.tags.join(", ")}`);
    doc.moveDown();
  });

  doc.end();

  res.end();
};

export const notionExportController = async (req, res) => {
  const prompts = await promptModel.find({ owner: req.user._id });
  let md = "# Exported Prompts\n\n";
  prompts.forEach((p, i) => {
    md += `## ${i + 1}. ${p.title}\n\n`;
    md += `${p.content}\n\n`;
    md += `Tags: ${p.tags.join(", ")}\n\n`;
  });
  res.setHeader("Content-Disposition", "attachment; filename=prompts.md");
  res.setHeader("Content-Type", "text/markdown");
  res.send(md);
};
