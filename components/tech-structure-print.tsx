import type { TechStructure } from "@/lib/tech-structure";

export function TechStructurePrint({ data }: { data: TechStructure }) {
  return (
    <div className="tech-print-block">
      <section className="tech-print-section">
        <div className="tech-print-heading">
          <h3>الهيكلة الحالية (٢٠٢٦)</h3>
          <span>{data.current.title}</span>
        </div>

        <div className="tech-print-director">
          <span className="tech-print-avatar" aria-hidden="true">
            {data.director.initials}
          </span>
          <span>
            <strong>{data.director.name}</strong>
            <span className="tech-print-role">{data.director.role}</span>
          </span>
        </div>

        <div className="tech-print-people">
          {data.current.people.map((person) => (
            <div className="tech-print-person" key={person.id}>
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </div>
          ))}
        </div>

        <p className="tech-print-scope">
          <span>النطاق</span>
          {data.current.scope}
        </p>

        <p className="tech-print-problem">{data.current.summary}</p>
      </section>

      <section className="tech-print-section">
        <div className="tech-print-heading">
          <h3>هيكلة ٢٠٢٧</h3>
          <span>{data.next.title}</span>
        </div>

        <div className="tech-print-director">
          <span className="tech-print-avatar" aria-hidden="true">
            {data.director.initials}
          </span>
          <span>
            <strong>{data.director.name}</strong>
            <span className="tech-print-role">{data.director.role}</span>
          </span>
          <span className="tech-print-badge">
            {data.director.departmentBadge}
          </span>
        </div>

        <div className="tech-print-departments">
          {data.next.departments.map((department) => (
            <section
              className={`tech-print-department is-${department.id}`}
              key={department.id}
            >
              <div className="tech-print-dept-head">
                <h4>{department.name}</h4>
                <p>{department.scope}</p>
              </div>

              <div className="tech-print-row">
                <span className="tech-print-person-copy">
                  <strong>{department.head.name}</strong>
                  <span>{department.head.role}</span>
                </span>
                <span className="tech-print-tag">رئيس القسم</span>
              </div>

              <div className="tech-print-row">
                <span className="tech-print-person-copy">
                  <strong>{department.engineer.name}</strong>
                  <span>{department.engineer.role}</span>
                </span>
              </div>
            </section>
          ))}
        </div>

        <p className="tech-print-note">
          <strong>{data.flexibility.title}:</strong> {data.flexibility.text}
        </p>

        <div className="tech-print-saif">
          <span className="tech-print-saif-label">{data.saif.label}</span>
          <h4>{data.saif.title}</h4>
          <p>{data.saif.text}</p>
        </div>
      </section>
    </div>
  );
}
