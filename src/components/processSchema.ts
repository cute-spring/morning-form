///Users/gavin/Desktop/2022/amis/src/types.ts
export interface Schema {
  type: string;
  props: Props;
  //   visibleOn?: string;
  //   hiddenOn?: string;
  children?: Array<Schema> | null;
}
export interface Props {
  [propName: string]: any;
}

function addInternalKey(parentKey: string, schemaList: Array<Schema> = []) {
  let sequence = schemaList.filter((schema, index) => {
    return !!schema.props.__key__;
  }).length;
  schemaList.forEach((schema: Schema) => {
    const { props, children } = schema;
    if (!props.__key__) {
      props.__key__ = `${parentKey}_${sequence++}`;
    }
    if (children) {
      addInternalKey(props.__key__, children);
    }
  });
}

const processSchema = (schema: Schema) => {
  addInternalKey("k", [schema]);
  return schema;
};

export default processSchema;
