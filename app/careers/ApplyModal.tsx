'use client'

import { useEffect, useRef, useState } from 'react'

export type ApplyModalJob = {
  id: string
  title: string
  dept: string
}

type Props = {
  open: boolean
  onClose: () => void
  jobs: ApplyModalJob[]
  defaultJobId?: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export default function ApplyModal({ open, onClose, jobs, defaultJobId }: Props) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [positionId, setPositionId] = useState<string>(defaultJobId ?? jobs[0]?.id ?? '')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Sync defaultJobId whenever modal is opened from a specific card.
  useEffect(() => {
    if (open && defaultJobId) setPositionId(defaultJobId)
  }, [open, defaultJobId])

  // Body scroll lock + focus first field on open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 120)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(id)
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  function reset() {
    setName('')
    setEmail('')
    setLinkedin('')
    setMessage('')
    setHoneypot('')
    setStatus({ kind: 'idle' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status.kind === 'submitting') return
    setStatus({ kind: 'submitting' })
    const job = jobs.find((j) => j.id === positionId)
    try {
      const resp = await fetch('/api/apply/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: job ? `${job.title} (${job.dept})` : '未指定',
          positionId,
          name,
          email,
          linkedin,
          message,
          website: honeypot,
        }),
      })
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}))
        throw new Error(data?.error || `HTTP ${resp.status}`)
      }
      setStatus({ kind: 'success' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : '送信に失敗しました'
      setStatus({ kind: 'error', message: msg })
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,14,12,0.6)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 40px) clamp(16px, 3vw, 32px)',
        zIndex: 10000,
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 24,
          maxWidth: 560,
          width: '100%',
          padding: 'clamp(28px, 4vw, 40px)',
          boxShadow: '0 40px 80px -20px rgba(10,14,12,0.35)',
          margin: 'auto',
          position: 'relative',
          fontFamily: 'var(--font-noto), system-ui, sans-serif',
          color: '#0a0e0c',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            fontSize: 22,
            color: '#82897f',
            cursor: 'pointer',
            lineHeight: 1,
            padding: 4,
          }}
        >
          ×
        </button>

        {status.kind === 'success' ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(14,171,110,0.12)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: '#065f46',
                marginBottom: 16,
              }}
            >
              ✓
            </div>
            <h2
              id="apply-modal-title"
              style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}
            >
              応募を受け付けました
            </h2>
            <p style={{ fontSize: 14, color: '#3d4541', lineHeight: 1.8, marginBottom: 28 }}>
              ご応募ありがとうございます。<br />
              内容を確認のうえ、5 営業日以内にご連絡いたします。
            </p>
            <button
              type="button"
              onClick={() => {
                reset()
                onClose()
              }}
              style={{
                background: '#0a0e0c',
                color: '#fafaf7',
                border: 'none',
                padding: '14px 28px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              閉じる
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily: 'var(--font-mono), ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.15em',
                color: '#065f46',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Apply to DynaMeet
            </div>
            <h2
              id="apply-modal-title"
              style={{
                fontSize: 'clamp(22px, 3.2vw, 28px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: 8,
              }}
            >
              応募フォーム
            </h2>
            <p style={{ fontSize: 13, color: '#82897f', marginBottom: 28, lineHeight: 1.7 }}>
              内容を確認のうえ、担当より 5 営業日以内にご連絡いたします。
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              <Field label="応募職種" required>
                <select
                  value={positionId}
                  onChange={(e) => setPositionId(e.target.value)}
                  required
                  style={inputStyle()}
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.dept === 'Open' ? j.title : `${j.title}（${j.dept}）`}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="お名前" required>
                <input
                  ref={firstFieldRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  maxLength={200}
                  style={inputStyle()}
                />
              </Field>

              <Field label="メールアドレス" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  maxLength={200}
                  style={inputStyle()}
                />
              </Field>

              <Field label="LinkedIn / ポートフォリオ URL（任意）">
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  autoComplete="url"
                  placeholder="https://..."
                  maxLength={300}
                  style={inputStyle()}
                />
              </Field>

              <Field label="ひとこと（任意）">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder="興味を持った理由・質問・自己紹介など"
                  style={{ ...inputStyle(), resize: 'vertical', minHeight: 96 }}
                />
              </Field>

              {/* Honeypot — hidden from humans */}
              <div aria-hidden="true" style={{ position: 'absolute', left: -9999, top: -9999 }}>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {status.kind === 'error' && (
                <div
                  role="alert"
                  style={{
                    background: 'rgba(220, 38, 38, 0.08)',
                    color: '#991b1b',
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  送信エラー: {status.message}。時間をおいて再度お試しください。
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="submit"
                  disabled={status.kind === 'submitting'}
                  style={{
                    flex: 1,
                    background: '#0a0e0c',
                    color: '#fafaf7',
                    border: 'none',
                    padding: '14px 24px',
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: status.kind === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: status.kind === 'submitting' ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {status.kind === 'submitting' ? '送信中…' : '応募する'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    color: '#3d4541',
                    border: '1px solid #e4e3dd',
                    padding: '14px 20px',
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  キャンセル
                </button>
              </div>

              <p style={{ fontSize: 11, color: '#82897f', marginTop: 4, lineHeight: 1.7 }}>
                送信いただいた情報は採用選考のみに利用します。<br />
                <a href="/privacy-policy/" style={{ color: '#3d4541', textDecoration: 'underline' }}>
                  プライバシーポリシー
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#0a0e0c' }}>
        {label}
        {required && <span style={{ color: '#065f46', marginLeft: 4 }}>*</span>}
      </span>
      {children}
    </label>
  )
}

function inputStyle(): React.CSSProperties {
  return {
    background: '#fafaf7',
    border: '1px solid #e4e3dd',
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: 14,
    color: '#0a0e0c',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    width: '100%',
    boxSizing: 'border-box',
  }
}
