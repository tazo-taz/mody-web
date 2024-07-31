import { useState } from 'react';
import Tab, { TabType } from '.';

type useTabType = Omit<TabType, "activeIndex" | "nav"> & {
  initialIndex?: number,
  nav: string[]
}

export default function useTab({
  nav,
  initialIndex = 0,
  ...props
}: useTabType) {
  const [index, setIndex] = useState(initialIndex);
  return {
    Tab: () => (
      <Tab
        nav={nav.map((title, inx) => ({
          title, onClick: () => setIndex(inx)
        }))}
        activeIndex={index}
        {...props}
      />
    ),
    index,
  };
}
