import { associationGroups, type AssociationGroup } from "@/lib/associations";
import styles from "./associations.module.css";

const numberFormatter = new Intl.NumberFormat("ar-EG");

function formatGroupCount(group: AssociationGroup): string {
  const count = group.associations.length;

  if (count === 1) {
    return "جمعية واحدة";
  }

  if (count === 2) {
    return "جمعيتان";
  }

  if (count >= 3 && count <= 10) {
    return `${numberFormatter.format(count)} جمعيات`;
  }

  return `${numberFormatter.format(count)} جمعية`;
}

export function AssociationsView() {
  return (
    <div className={styles.associations}>
      <p className={styles.lead}>ثلاث مجموعات بحسب الاحتياج التقني.</p>

      <div className={styles.groups}>
        {associationGroups.map((group) => (
          <section
            key={group.id}
            id={`associations-${group.id}`}
            className={`${styles.group}${
              group.featured ? ` ${styles.featured}` : ""
            }`}
            aria-labelledby={`associations-${group.id}-title`}
          >
            <header className={styles.groupHead}>
              <span className={styles.groupCount}>
                {formatGroupCount(group)}
              </span>
              <h2
                className={styles.groupTitle}
                id={`associations-${group.id}-title`}
              >
                {group.title}
              </h2>
              {group.featured ? (
                <span className={styles.groupBadge}>فرصة للعمل معنا</span>
              ) : null}
            </header>

            <ul className={styles.items}>
              {group.associations.map((association) => (
                <li className={styles.item} key={association.id}>
                  <span className={styles.logoBox}>
                    <img
                      src={association.logo}
                      alt=""
                      width={72}
                      height={52}
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.name}>{association.name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
