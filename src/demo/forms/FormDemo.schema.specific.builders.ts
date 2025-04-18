import { FieldSchemaBuilder } from '../../dependency/schema/fieldSchema/field.schema.builder'

export const IdBuilder = new FieldSchemaBuilder(1, 'id').setTypeData('string')
export const OrderBuilder = new FieldSchemaBuilder(2, 'order').setTypeData('number')
export const ShowRoomsBuilder = new FieldSchemaBuilder(3, 'selectShowrooms').setTypeData('select')
export const InputTextBuilder = new FieldSchemaBuilder(4, 'inputControl').setTypeData('string')
export const SelectIdBuilder = new FieldSchemaBuilder(5, 'selectOptionsId').setTypeData('select')
export const CheckBuilder = new FieldSchemaBuilder(6, 'trueFalseValue').setTypeData('checkbox')
export const DateTimeBuilder = new FieldSchemaBuilder(7, 'dateTimeValue')
    .setTypeData('datetime')
    .setDefaultValue('24/10/1977')
export const RadioBuilder = new FieldSchemaBuilder(8, 'selectedRadioId').setTypeData('radio')
export const RteBuilder = new FieldSchemaBuilder(9, 'richTextField')
    .setTypeData('textarea')
    .setDefaultValue(
        'IjxlbT5qZSBTdWlzJm5ic3A7PC9lbT4gPHN0cm9uZz5WcmFpbWVudDwvc3Ryb25nPiA8cz5UcuhzIENvb2w8L3M+Ig=='
    )
export const RangeBuilder = new FieldSchemaBuilder(10, 'rangeSlider')
    .setTypeData('range')
    .setDefaultValue('25')
export const UserIdBuilder = new FieldSchemaBuilder(11, 'userName').setTypeData('string')
export const PasswordBuilder = new FieldSchemaBuilder(12, 'password').setTypeData('string')
export const ToggleBuilder = new FieldSchemaBuilder(13, 'toggle').setTypeData('toggle')
