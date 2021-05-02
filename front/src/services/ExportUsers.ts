/* eslint-disable @typescript-eslint/no-explicit-any */
import { exportFile, Notify } from 'quasar';
import { useI18n } from 'vue-i18n';

export default function useExportUsers() {
  const { t } = useI18n();

  const getFormatedValue = (val: string, formatFn ?: (v: string) => void) => {
    let formatted = formatFn !== undefined ? formatFn(val) : val;
    // accept 0 values
    formatted = formatted === undefined || formatted === null ? '' : String(formatted);
    formatted = formatted.split('"').join('""');

    return `"${formatted}"`;
  };

  const exportUsers = (columns: {
    label: string;
    name: string;
    field?: string ;
    align?: string;
    format?: (val: any) => string;
}[], rows?: any[]) => {
    if (rows && rows.length) {
      // We eliminate the columns without 'field' and the rows are concatenated
      const content = [columns.filter((x) => x.field).map((col) => getFormatedValue(col.label))]
        .concat(

          rows.map((row: { [x: string]: string }) => columns
            // The row is formatted based on the column
            .map((col) => getFormatedValue(row[col.field || ''], col.format)).join(',')),

        ).join('\r\n');

      const status = exportFile('random-users.csv', content, 'text/csv');

      if (status !== true) {
        Notify.create({
          message: t('Notify.exportError'),
          color: 'negative',
          icon: 'warning',
        });
      }
    }
  };

  return {
    exportUsers,
  };
}
