---
name: agent-workflow
description: Enforce a strict four-step workflow (Phân tích - Đánh giá - Plan - Kiểm thử) with Rollback plans, Milestone breakdowns, Definition of Done, and require explicit user approval for all changes before execution. Use when conducting any development, task execution, or modification workflow.
---
# Agent Workflow and Governance

Enforce strict adherence to the required workflow, change management protocols, and quality controls.

## When to Use
Use this skill for all task execution, coding, modifications, and project planning.

## Core Rules and Flow

1. **Phân tích (Analysis):** Analyze the user request, requirements, context, and current state thoroughly before taking any action.
2. **Đánh giá (Evaluation):** Evaluate potential impacts, risks, trade-offs, and alternative approaches.
3. **Plan (Kế hoạch):** Formulate a clear, step-by-step plan for the task or changes, including:
   - Detailed execution steps.
   - **Rollback Plan:** A brief strategy to revert changes if something fails.
   - **Milestone Breakdown:** For large or complex tasks, break the task down into smaller sub-phases for sequential approval.
   - Present this plan to the user.
4. **Kiểm thử (Testing):** Define testing criteria, validation steps, verification methods, and a clear **Definition of Done (DoD)** to ensure correctness.

## Change Management Protocol
- **Explicit Approval Required:** All proposed changes, implementations, or modifications must be explicitly requested and approved by the user before execution.
- Never execute changes autonomously without prior user consent.
- Có thể chia thành nhiều task, và nhiều module làm từng lúc.

## Technical & Aesthetic Constraints (Ràng Buộc Kỹ Thuật & Thẩm Mỹ)
- **Ràng buộc Icon - Font Awesome Only:** Tuyệt đối KHÔNG sử dụng các thư viện icon ngoài hoặc SVG rời rạc tự chế (ví dụ: cấm dùng lucide-react). Toàn bộ icon trong toàn dự án BẮT BUỘC chỉ sử dụng bộ icon chuẩn của **Font Awesome** (`@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-regular-svg-icons`).
- **Tiêu chuẩn Front-end Cao Cấp (Senior FE 10-Year Quality):**
  - Không để lộ viền trắng (harsh white borders), viền đứt đoạn hoặc đường kẻ chia khối thô cứng.
  - Sử dụng hairline subtle borders, gradients cao cấp (`border-[#d4af37]/15` hoặc `border-white/[0.05]`), surface lighting tinh tế, không làm chia cắt không gian thị giác.
  - Typography xa xỉ (Haute Horlogerie luxury typography): tỷ lệ vàng, trọng số chữ thanh thoát (`font-light`, `font-normal`, `font-medium`, độ dày vừa phải), tuyệt đối không dùng chữ đen thô dày cộp.
  - Video hero / intro showcase phải fit 100% giao diện (full-bleed responsive cinema fit), không bị co cụm hay để viền đen thừa thãi.
