// Libraries
import React from 'react';

// Components

interface GroupProps {}

export const Group: React.FC<GroupProps> = props => {
  const { ...restProps } = props;

  return <div>Group</div>;
};
