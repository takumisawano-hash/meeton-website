'use client'

import type { CSSProperties, ReactNode } from 'react'
import { openMeetonDownloadCenter } from '@/app/lib/meeton-cta'

type DocRequestButtonProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

/**
 * 「資料請求」CTA — opens the Meeton widget's download-center popup
 * (the same one the global Nav "お役立ち資料" link triggers).
 *
 * Server components can't bind onClick, so server pages render this
 * client wrapper instead of inlining a button.
 */
export default function DocRequestButton({
  children,
  style,
  className,
}: DocRequestButtonProps) {
  return (
    <button
      type="button"
      onClick={openMeetonDownloadCenter}
      style={style}
      className={className}
    >
      {children}
    </button>
  )
}
