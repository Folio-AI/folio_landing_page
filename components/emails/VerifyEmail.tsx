import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

export function VerifyEmail(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Verify Email</Button>
    </Html>
  );
}