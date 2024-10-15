'use client';

// Libraries
import React from 'react';
import { motion } from 'framer-motion';

// Components
import { Card, Typography } from '@/components/ui';

interface SignUpProps {}

const { Text } = Typography;

export const SignUp: React.FC<SignUpProps> = props => {
  const { ...restProps } = props;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...restProps}>
      <Card>
        <Text strong>Sign Up</Text>
      </Card>
    </motion.div>
  );
};
