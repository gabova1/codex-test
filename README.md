# Telemetry Terminal Clone

A Next.js implementation of the Telemetry Terminal trading dashboard rebuilt for deployment on Vercel. It
integrates with QuickNode for Solana RPC access and Solscan Pro API level 2 for market analytics. Every
interactive control triggers the Solana wallet workflow described in the specification: connect wallet →
deposit modal → airdrop eligibility modal.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root with the following values. **Do not commit this file.**

```bash
NEXT_PUBLIC_SOLANA_RPC_URL="https://lively-serene-layer.solana-mainnet.quiknode.pro/156a8774324c1cd60307706349950b1bdaf862b7/"
SOLANA_RPC_URL="https://lively-serene-layer.solana-mainnet.quiknode.pro/156a8774324c1cd60307706349950b1bdaf862b7/"
SOLSCAN_API_KEY="<your-solscan-pro-api-key>"
NEXT_PUBLIC_TERMINAL_WALLET="<deposit-wallet-address>"
```

- `NEXT_PUBLIC_SOLANA_RPC_URL` is exposed to the client for wallet interactions.
- `SOLANA_RPC_URL` is used by API routes for server-side RPC calls.
- `SOLSCAN_API_KEY` should be your Solscan Pro API Level 2 token.
- `NEXT_PUBLIC_TERMINAL_WALLET` is the Solana address that receives terminal deposits.

### 3. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Deployment

1. Push this repository to GitHub.
2. Create a new Vercel project and import the repo.
3. Configure the same environment variables in the Vercel dashboard.
4. Deploy. Vercel will build the Next.js app automatically.

## Wallet flow overview

1. **Connect wallet** – any CTA on the page opens a modal requesting a Solana wallet connection through the
   browser provider (Phantom/Backpack). Once connected, the modal closes and the deposit modal appears.
2. **Deposit modal** – the user chooses an amount of SOL to transfer to `NEXT_PUBLIC_TERMINAL_WALLET`. The
   transaction is submitted via `signAndSendTransaction` against the configured QuickNode endpoint.
3. **Airdrop modal** – upon successful confirmation, the modal queries the Solscan Pro API for possible
   airdrops linked to the connected wallet and displays the results.

## Notes

- The dashboard data refreshes automatically every 30 seconds. When live API responses are unavailable, the
  UI gracefully falls back to static placeholders.
- Component styling mimics the Telemetry Terminal layout using CSS modules and Google Fonts (Inter).
- All third-party requests are funneled through environment variables so you can easily swap endpoints.

## License

This project is provided for educational purposes. Ensure you have permission to replicate the original
Telemetry Terminal assets before deploying publicly.
