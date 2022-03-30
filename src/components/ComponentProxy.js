import React from "react";
import { v4 as uuidv4 } from "uuid";

const getComponentProxy = ({ componentMapper }) => {
  function ComponentProxy(metadate) {
    const { type, props, children } = metadate;
    const childrenInstance = children?.map((childMetadata) => {
      childMetadata.key = childMetadata.key || uuidv4();
      return React.createElement(ComponentProxy, childMetadata);
    });
    return React.createElement(componentMapper[type], props, childrenInstance);
  }
  return (schema) => React.createElement(ComponentProxy, schema);
};

export default getComponentProxy;
