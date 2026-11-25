"use client";

import { useState } from "react";
import styles from "./plan-2027.module.css";
import {
  calculatePlan,
  formatEngineerCount,
  formatPlanNumber,
  formatProductCount,
  formatProjectCount,
  formatUnitCount,
  planAllSelected,
  planDefaults,
  planProjects,
  planTeam,
  type PlanProjectComputed,
} from "@/lib/plan-2027";

export function Plan2027() {
  const [selected, setSelected] = useState<string[]>(() => [
    ...planDefaults.selected,
  ]);
  const [units, setUnits] = useState(planDefaults.units);
  const [dragging, setDragging] = useState<{
    id: string;
    source: "library" | "plan";
  } | null>(null);
  const [isOverPlan, setIsOverPlan] = useState(false);
  const [isOverLibrary, setIsOverLibrary] = useState(false);

  const calc = calculatePlan(selected, units);
  const selectedSet = new Set(selected);
  const fullEngineers = Math.floor(calc.engineers);
  const partTimeEngineers = calc.engineers % 1 > 0 ? 1 : 0;
  const additionalFullEngineers = Math.floor(calc.additional.engineers);
  const additionalPartTimeEngineers =
    calc.additional.engineers % 1 > 0 ? 1 : 0;

  const libraryProjects: PlanProjectComputed[] = planProjects
    .filter((project) => !selectedSet.has(project.id))
    .map((project) => {
      if (project.units) {
        const count = Math.min(
          project.units.max,
          Math.max(project.units.min, units),
        );

        return {
          ...project,
          computedProducts: project.units.productsPerUnit * count,
          computedEngineers: project.units.engineersPerUnit * count,
          unitsCount: count,
        };
      }

      return {
        ...project,
        computedProducts: project.products,
        computedEngineers: project.engineers,
      };
    });

  const addProject = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  const removeProject = (id: string) => {
    setSelected((current) => current.filter((item) => item !== id));
  };

  const resetDrag = () => {
    setDragging(null);
    setIsOverPlan(false);
    setIsOverLibrary(false);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLElement>,
    id: string,
    source: "library" | "plan",
  ) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.setData("application/x-plan-2027-source", source);
    event.dataTransfer.effectAllowed = source === "plan" ? "move" : "copy";
    setDragging({ id, source });
  };

  const handlePlanDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const source =
      event.dataTransfer.getData("application/x-plan-2027-source") ||
      dragging?.source;
    const id = event.dataTransfer.getData("text/plain") || dragging?.id;

    if (source === "library" && id) {
      addProject(id);
    }

    resetDrag();
  };

  const handleLibraryDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const source =
      event.dataTransfer.getData("application/x-plan-2027-source") ||
      dragging?.source;
    const id = event.dataTransfer.getData("text/plain") || dragging?.id;

    if (source === "plan" && id) {
      removeProject(id);
    }

    resetDrag();
  };

  const planCard = (
    project: PlanProjectComputed,
    variant: "library" | "plan",
  ) => {
    const isPlan = variant === "plan";
    const isSelected = !isPlan && selectedSet.has(project.id);

    return (
      <article
        className={`${styles.projectCard}${
          !isPlan ? ` ${styles.libraryCard}` : ""
        }${isSelected ? ` ${styles.isAdded}` : ""}`}
        key={`${variant}-${project.id}`}
        draggable={isPlan || !isSelected}
        onDragStart={(event) =>
          handleDragStart(event, project.id, isPlan ? "plan" : "library")
        }
        onDragEnd={resetDrag}
        title={
          isPlan
            ? "اسحب المشروع إلى قائمة المشاريع لإزالته"
            : isSelected
              ? "المشروع مضاف إلى الخطة"
              : "اسحب المشروع إلى الخطة"
        }
      >
        <header className={styles.cardTop}>
          <div className={styles.cardIdentity}>
            {project.tag ? (
              <span className={styles.cardTag}>{project.tag}</span>
            ) : null}
            <h4 className={styles.cardTitle}>{project.name}</h4>
          </div>

          <div className={styles.cardActions}>
            <span className={styles.productBadge}>
              {formatProductCount(project.computedProducts)}
            </span>
            {isPlan ? (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeProject(project.id)}
                aria-label={`إزالة ${project.name} من الخطة`}
              >
                ×
              </button>
            ) : null}
          </div>
        </header>

        {project.productsNote ? (
          <p className={styles.productsNote}>{project.productsNote}</p>
        ) : null}

        {project.note ? (
          <p className={styles.cardNote}>{project.note}</p>
        ) : null}

        <div className={styles.cardStaff}>
          {project.computedEngineers > 0 ? (
            <span className={styles.staffPill}>
              {formatEngineerCount(project.computedEngineers)}
            </span>
          ) : (
            <span className={styles.staffPillMuted}>منتجات البرنامج</span>
          )}
          {project.projectManagers > 0 ? (
            <span className={styles.staffPill}>مدير منتجات</span>
          ) : null}
          {project.testers > 0 ? (
            <span className={styles.staffPill}>مختبر</span>
          ) : null}
        </div>

        {isPlan && project.units ? (
          <div className={styles.stepper}>
            <div className={styles.stepperText}>
              <span className={styles.stepperLabel}>عدد التمكين</span>
              <span className={styles.stepperRule}>
                كل ٢ تمكين = مهندس بدوام كامل
              </span>
            </div>

            <div className={styles.stepperControls}>
              <button
                type="button"
                className={styles.stepButton}
                onClick={() =>
                  setUnits((current) =>
                    Math.max(project.units!.min, current - 1),
                  )
                }
                disabled={units <= project.units.min}
                aria-label="تقليل عدد الجمعيات"
              >
                −
              </button>
              <span className={styles.stepValue}>
                {formatUnitCount(units)}
              </span>
              <button
                type="button"
                className={styles.stepButton}
                onClick={() =>
                  setUnits((current) =>
                    Math.min(project.units!.max, current + 1),
                  )
                }
                disabled={units >= project.units.max}
                aria-label="زيادة عدد الجمعيات"
              >
                +
              </button>
            </div>
          </div>
        ) : null}

        {!isPlan ? (
          <div className={styles.cardFooter}>
            {isSelected ? (
              <span className={styles.addedBadge}>مضاف إلى الخطة</span>
            ) : (
              <button
                type="button"
                className={styles.addCardButton}
                onClick={() => addProject(project.id)}
              >
                أضف إلى الخطة
              </button>
            )}
          </div>
        ) : null}
      </article>
    );
  };

  return (
    <div className={styles.plan}>
      <section
        className={styles.summary}
        id="plan-summary"
        aria-labelledby="plan-summary-title"
      >
        <div className={styles.summaryTop}>
          <div>
            <p className={styles.summaryKicker}>خطة ٢٠٢٧</p>
            <h2 className={styles.summaryTitle} id="plan-summary-title">
              الأرقام المجملة
            </h2>
          </div>
          <p className={styles.summaryNote}>
            تتحدث تلقائيًا مع اختياراتك.
          </p>
        </div>

        <div className={styles.summaryStats} aria-live="polite">
          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>عدد المنتجات المتوقعة</span>
            <strong className={styles.statValue}>
              {formatPlanNumber(calc.products)}
            </strong>
          </div>

          <div className={styles.summaryStat}>
            <span
              className={styles.statLabel}
              title="المشاريع المختارة في الخطة"
            >
              المشاريع المؤكدة
            </span>
            <strong className={styles.statValue}>
              {formatPlanNumber(calc.selectedCount)}
            </strong>
          </div>

          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>
              عدد الموظفين التقنيين المطلوبين
            </span>
            <strong className={styles.statValue}>
              {formatPlanNumber(calc.total)}
            </strong>
            <span className={styles.statUnit}>بدوام كامل مكافئ</span>
          </div>
        </div>
      </section>

      <section
        className={styles.calculator}
        id="plan-calculator"
        aria-labelledby="plan-calculator-title"
      >
        <div className={styles.calcHead}>
          <div>
            <p className={styles.calcKicker}>الخطة</p>
            <h2 className={styles.calcTitle} id="plan-calculator-title">
              حاسبة المشاريع
            </h2>
          </div>

          <div className={styles.calcActions}>
            <button
              type="button"
              className={styles.actionBtnPrimary}
              onClick={() => setSelected([...planAllSelected])}
            >
              أضف الكل
            </button>
            <button
              type="button"
              className={styles.actionBtnGhost}
              onClick={() => setSelected([])}
            >
              إفراغ الخطة
            </button>
          </div>
        </div>

        <p className={styles.hint}>
          اسحب المشروع من القائمة إلى الخطة، أو من الخطة إلى القائمة لإزالته.
          يمكنك أيضًا استخدام الأزرار. الخطة فارغة الآن — أضف ما تريد.
        </p>

        <div className={styles.workspace}>
          <aside
            className={`${styles.library}${
              isOverLibrary ? ` ${styles.isOver}` : ""
            }`}
            aria-label="قائمة المشاريع"
            onDragOver={(event) => {
              if (dragging?.source === "plan") {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }
            }}
            onDragEnter={(event) => {
              if (dragging?.source === "plan") {
                event.preventDefault();
                setIsOverLibrary(true);
              }
            }}
            onDragLeave={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget as Node)
              ) {
                setIsOverLibrary(false);
              }
            }}
            onDrop={handleLibraryDrop}
          >
            <div className={styles.libraryHead}>
              <h3 className={styles.libraryTitle}>قائمة المشاريع</h3>
              <span className={styles.libraryHint}>اسحب إلى الخطة</span>
            </div>

            {libraryProjects.length > 0 ? (
              <ul className={styles.libraryList}>
                {libraryProjects.map((project) => (
                  <li key={project.id}>{planCard(project, "library")}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyLibrary}>كل المشاريع في الخطة.</p>
            )}
          </aside>

          <div className={styles.planner}>
            <div
              className={`${styles.dropZone}${
                isOverPlan ? ` ${styles.isOver}` : ""
              }`}
              onDragOver={(event) => {
                if (dragging?.source === "library") {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "copy";
                }
              }}
              onDragEnter={(event) => {
                if (dragging?.source === "library") {
                  event.preventDefault();
                  setIsOverPlan(true);
                }
              }}
              onDragLeave={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget as Node)
                ) {
                  setIsOverPlan(false);
                }
              }}
              onDrop={handlePlanDrop}
            >
              <div className={styles.planHead}>
                <h3 className={styles.planTitle}>خطة ٢٠٢٧</h3>
                <span className={styles.planCount}>
                  {formatProjectCount(calc.selectedCount)}
                </span>
              </div>

              {calc.selected.length > 0 ? (
                <div className={styles.planCards}>
                  {calc.selected.map((project) =>
                    planCard(project, "plan"),
                  )}
                </div>
              ) : (
                <p className={styles.emptyPlan}>
                  الخطة فارغة. اسحب مشروعًا من القائمة، أو اضغط «أضف الكل».
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.staffCard}
        id="plan-staff"
        aria-labelledby="plan-staff-title"
      >
        <div className={styles.staffHead}>
          <div>
            <p className={styles.staffKicker}>الفريق</p>
            <h2 className={styles.staffTitle} id="plan-staff-title">
              الفريق المطلوب
            </h2>
          </div>
          <span className={styles.staffNote}>بدوام كامل مكافئ</span>
        </div>

        <div className={styles.staffGrid}>
          <div className={styles.role}>
            <span className={styles.roleLabel}>مدير تقني</span>
            <strong className={styles.roleCount}>
              {formatPlanNumber(calc.director)}
            </strong>
            <p className={styles.roleNames}>
              {calc.director > 0 ? planTeam.director : "—"}
            </p>
          </div>

          <div className={styles.role}>
            <span className={styles.roleLabel}>مدير منتجات</span>
            <strong className={styles.roleCount}>
              {formatPlanNumber(calc.projectManagers)}
            </strong>
            <p className={styles.roleNames}>
              {calc.projectManagers > 0 ? planTeam.productManager : "—"}
              {calc.additional.projectManagers > 0 ? (
                <span>
                  {formatPlanNumber(calc.additional.projectManagers)} إضافي
                </span>
              ) : null}
            </p>
          </div>

          <div className={styles.role}>
            <span className={styles.roleLabel}>
              مهندس برمجيات — دوام كامل
            </span>
            <strong className={styles.roleCount}>
              {formatPlanNumber(fullEngineers)}
            </strong>
            <p className={styles.roleNames}>
              {calc.engineers > 0 ? planTeam.engineers.join("، ") : "—"}
              {additionalFullEngineers > 0 ? (
                <span>
                  {formatPlanNumber(additionalFullEngineers)} إضافي
                </span>
              ) : null}
            </p>
          </div>

          <div className={styles.role}>
            <span className={styles.roleLabel}>
              مهندس برمجيات — دوام جزئي
            </span>
            <strong className={styles.roleCount}>
              {formatPlanNumber(partTimeEngineers)}
            </strong>
            <p className={styles.roleNames}>
              {partTimeEngineers > 0 ? "مهندس جزئي إضافي" : "—"}
            </p>
          </div>

          <div className={styles.role}>
            <span className={styles.roleLabel}>مختبر</span>
            <strong className={styles.roleCount}>
              {formatPlanNumber(calc.testers)}
            </strong>
            <p className={styles.roleNames}>
              {calc.testers > 0 ? "مختبر إضافي" : "—"}
            </p>
          </div>
        </div>

        <div className={styles.staffBottom}>
          <div className={styles.total}>
            <span className={styles.totalLabel}>إجمالي الفريق المطلوب</span>
            <strong className={styles.totalValue}>
              {formatPlanNumber(calc.total)}
            </strong>
          </div>
          <p className={styles.additionalNote}>
            {calc.selectedCount > 0 ? (
              <>
                الفريق الحالي {formatPlanNumber(calc.baseTotal)}:{" "}
                {planTeam.director}، {planTeam.productManager}،{" "}
                {planTeam.engineers.join("، ")}.
                {calc.total > calc.baseTotal ? (
                  <>
                    {" "}
                    المطلوب إضافته:{" "}
                    {formatPlanNumber(calc.additional.projectManagers)} مدير
                    منتجات،{" "}
                    {formatPlanNumber(additionalFullEngineers)} مهندس دوام
                    كامل،{" "}
                    {formatPlanNumber(additionalPartTimeEngineers)} مهندس دوام
                    جزئي، {formatPlanNumber(calc.additional.testers)} مختبر.
                  </>
                ) : (
                  " الفريق الحالي يغطي المطلوب."
                )}
              </>
            ) : (
              "لا مشاريع مختارة."
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
