# Meeton Website

## 機能ページ構成: 4プロダクト

### URL マッピング
| Product | URL | Color | Component |
|---------|-----|-------|-----------|
| AI Chat | /features/ai-chat/ | #12a37d | AiChatPageClient.tsx |
| AI Email | /features/ai-email/ | #3b6ff5 | AiEmailPageClient.tsx |
| Meetings | /features/meetings/ | #0891b2 | MeetingsPageClient.tsx |
| Offers | /features/offers/ | #7c5cfc | OffersPageClient.tsx |

### リダイレクト
- /features/detect/ → /features/ai-chat/
- /features/engage/ → /features/ai-chat/
- /features/nurture/ → /features/offers/
- /features/convert/ → /features/meetings/
- /features/chatbot/ → /features/ai-chat/
- /features/onsite/ → /features/offers/
- /features/offsite/ → /features/meetings/
