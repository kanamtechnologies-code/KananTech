import net from "node:net";

const port = Number(process.env.PORT ?? 3000);
// Next binds to IPv6 on macOS when available (:::3000). Check that first.
const hostsToTry = ["::", "0.0.0.0", "127.0.0.1"];

function tryBind(hostIdx = 0) {
  const host = hostsToTry[hostIdx];
  if (!host) process.exit(0);

  const tester = net.createServer();
  tester.unref();

  tester.once("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      // eslint-disable-next-line no-console
      console.error(
        `Port ${port} is already in use. Stop other running 'next dev' servers before starting a new one.\n` +
          `Tip: multiple dev servers can corrupt .next output and break CSS/JS chunks.`,
      );
      process.exit(1);
    }
    // Some hosts may not be available; try the next one.
    tryBind(hostIdx + 1);
  });

  tester.listen(port, host, () => {
    tester.close(() => process.exit(0));
  });
}

tryBind();

