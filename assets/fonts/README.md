# Fonts

The site bundles its production fonts locally through `next/font/local` so builds do
not depend on Google Fonts being reachable from the hosting build worker. The same
font files are also used by `next/og` for generated Open Graph images where satori
needs TTF files on disk.

All families are distributed under the SIL Open Font License 1.1; the license text
ships beside each family as required by the OFL.

- `BricolageGrotesque-Bold.ttf` — display face, used for the headline (600/700/800 declarations share this supplied bold file)
- `InterTight-Regular.ttf` — body face, weight 400
- `InterTight-Medium.ttf` — body face, weight 500
- `JetBrainsMono-Regular.ttf` — mono face, used for labels (400/500 declarations share this supplied regular file)
