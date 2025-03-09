import { type PropsWithChildren } from 'react';

export default function H1({ children }: PropsWithChildren) {
  return <h1 className="text-center text-2xl font-bold my-3">{children}</h1>;
}
