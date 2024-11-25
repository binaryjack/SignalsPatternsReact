import { FieldSchemeBuilder } from './field.scheme.builder'

export const IdBuilder = new FieldSchemeBuilder(1, 'id').typeData('string')
export const OrderBuilder = new FieldSchemeBuilder(2, 'order').typeData('number')
export const ShowRoomsBuilder = new FieldSchemeBuilder(3, 'selectShowrooms').typeData('select')
export const InputTextBuilder = new FieldSchemeBuilder(4, 'inputControl').typeData('string')
export const SelectIdBuilder = new FieldSchemeBuilder(5, 'selectOptionsId').typeData('select')
export const CheckBuilder = new FieldSchemeBuilder(6, 'trueFalseValue').typeData('check')
export const DateTimeBuilder = new FieldSchemeBuilder(7, 'dateTimeValue').typeData('datetime')
export const RadioBuilder = new FieldSchemeBuilder(8, 'selectedRadioId').typeData('radio')
export const RteBuilder = new FieldSchemeBuilder(9, 'richTextField').typeData('textarea')
export const RangeBuilder = new FieldSchemeBuilder(10, 'rangeSlider').typeData('range')
export const UserIdBuilder = new FieldSchemeBuilder(11, 'userName').typeData('string')
export const PasswordBuilder = new FieldSchemeBuilder(12, 'password').typeData('string')
export const ToggleBuilder = new FieldSchemeBuilder(13, 'toggle').typeData('toggle')
