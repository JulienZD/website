import styles from './index.module.css';

export default function LabeledCheckbox({ id, name, isChecked, onChange, label }) {
  return (
    <div className="inline-flex items-center">
      <input type="checkbox" id={id} className={styles.checkbox} name={name} checked={isChecked} onChange={onChange} />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  );
}
