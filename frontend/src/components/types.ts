import type { JSX } from "react"

export type FieldType=
| 'text' | 'number' | 'date' | 'dateTime' | 'select' | 'percentile' | 'textarea' | 'checkbox' | 'jsx' | 'button' | 'codeEditor' | 'password'

export interface FormField {
  type: FieldType
  field: string
  displayField?: string
  handledUnsavedChange?: boolean
  allowNegative?: boolean
  value?: string
  element?: JSX.Element | any
  alwaysShow?:boolean,
  isJSX?:boolean
  label: string
  permission?: {name:string, disable:(key:string)=>boolean, enable:(key:string)=>boolean}
  labelSubTextJsx?: (formik:any)=> JSX.Element
  labelSubTextBelow:boolean
  readonly?:  boolean | ((params?:any) => boolean)
  isReadOnlyValidation?: boolean
  skipChangeDetection? : boolean
  required?: boolean | ((params?: any) => boolean)
  maxTextareRow:number
  rows:number
  multiSelectDisplayField?:string,
  multiSelectValueField?:string,
  requiredOnSave?:boolean
  tooltipColumn?:string
  tooltip?: string
  tooltipElement?: JSX.Element
  uid?: string
  onlyWholeNumber?:boolean
  hidden?: boolean | ((params?: any) => boolean)
  maxlength?: number
  dependsOn?:{formField:string}[]
  isRemoteValidation?:boolean
  remoteValidationExtraParams: any;
  remoteDataValidator?: (
    data: any,
    initialValues: any,
    fieldValue: any,
  ) => { valid: boolean; msg?: string }
  remoteValidationOptions?: {
    queryName: string,
    countColumn: string
  }
  onSaveValidation?:() => Record<string, any>
  onSubmitValidation?:() => Record<string, any>
  onChangeValidation: () => Record<string, any>
  formatingMask?:'number' | 'date'
  fieldProps?: Record<string, any>
  resizeable?: boolean
  fieldtype?: string
 // button?: InputFieldWithButton
  defaultSelected?: boolean
  populates?: {formField: string, lovColumn: string}[]
  searchExtraParams?:{formField: string, queryFieldName: string,objectFieldName?:string, parentFieldName?:string}[]
  onchange?:(event: {value:any, formik:any, field: FormField, formContainerApi: FormApi })=>void
  layoutConfig?: {
    flex: number//1 // 0.5
  } 
  isShowingIcon?:boolean
  className?:string
  alwaysIncludeInPayload?: boolean
  fractionDigits?: number
  currency?: string
  onClickHandler?:(e:any)=> void
  convertPercentage?:boolean
  hidePercentageIcon?:boolean
}

export interface SectionsType {
  name: string
  id: string
  disabled?: boolean
  permission?: {name:string, disable:(key:string)=>boolean, enable?:(key:string)=>boolean}
  sectionTitle?:string
  jsxElement?:any
  type?:FieldType
  sectionClassName?:string
  layout:string
  variant? : 'simple' | 'noncollapsible' | 'region'
  groups: GroupType[]
 // validateRules: validateRulesType,
  hidden?: () => boolean;
  defaultOpen?: boolean;
  sectionIconComponent?: React.FunctionComponent <{section: SectionsType, formContainerApi:FormApi | undefined }>
}


export interface GroupWithJsx {
  type: 'jsx',
  children: React.FunctionComponent
}

export interface GroupWithFields {
  type: 'inputFields',
  fields: FormField[]
}

export interface AdditionalIconsType{
  icon:JSX.Element,
  onClickHandler?:(param?:any)=>void
}
export interface GroupWithGrid{
  type:'grid',
  editable:boolean,
  showTotal?:boolean,
  styles?:any,
  groupChildProps?:Record<string,any>,
  hideGridCount?:boolean,
  className?:string,
  supressDeleteIcon?:()=>boolean,
  supressCrud?:()=>boolean,
  isDeletehidden?:(params:any)=>boolean,
  additionalIcons:AdditionalIconsType[]
}

export type GroupType =  {
  hiddenChangeIcon?:string
  mutationNode: string
  hidden: boolean
  validateOnQuerryCompletion?: (values: Record<string, unknown> |  Record<string, any>[] ,context: any, type?: 'draft' | 'submit') => null | { errors: Record<string, string> }
  processData:(e:any)=>any
  buttons?: {label: string, onClick: (e: MouseEvent)=>void}[]
  queryConfig?: Record<string, any>
  rows?:[]
  validate?: (values: Record<string, unknown> |  Record<string, any>[] ,ref:any,context: any, type?: 'draft' | 'submit') => null | { errors: Record<string, string> } 
  groupOriginalIndex?: number
  customGridId?:string,
 // validateRules?: ValidateGroupToolPanelActionType
} & (GroupWithFields | GroupWithGrid | GroupWithJsx )