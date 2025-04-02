import DatePicker from '../../../components/datePicker/DatePicker'
import FormyForm from '../../../components/Formy/Formy.form'
import { demoFormInstance } from './datepicker.form.instance'

export const DatePickerDemo = () => {
    return (
        <FormyForm formy={demoFormInstance}>
            <DatePicker fieldName={'datePickerDemo'} />
        </FormyForm>
    )
}
