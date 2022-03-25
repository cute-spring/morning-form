import React from "react";
import { v4 as uuidv4 } from "uuid";

function addInternalKey(parentKey, children = []) {
  let sequence = children.filter((metadata, index) => {
    return !!metadata.props.__key__;
  }).length;
  children.forEach((metadata) => {
    const { props, children } = metadata;
    if (!props.__key__) {
      props.__key__ = `${parentKey}_${sequence++}`;
    }
    addInternalKey(props.__key__, children);
  });
}

const getComponentProxy = ({ schema, componentMapper }) => {
  addInternalKey("k", [schema]);
  console.log(schema);
  function ComponentProxy(metadate) {
    const { type, props, children } = metadate;
    const childrenInstance = children?.map((childMetadata) => {
      childMetadata.key = childMetadata.key || uuidv4();
      return React.createElement(ComponentProxy, childMetadata);
    });
    return React.createElement(componentMapper[type], props, childrenInstance);
  }
  return () => React.createElement(ComponentProxy, schema);
};

export default getComponentProxy;
