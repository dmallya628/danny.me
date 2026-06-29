import ThemedIcon from "./icon-themes";
import DesktopIcon from "./desktop-icon";

export function AboutIcon({ onClick }: { onClick: () => void }) {
  return (
    <DesktopIcon
      title="about.pdf"
      icon={
        <ThemedIcon
          light="/light/desktop/no-shadow/file.svg"
          dark="dark/desktop/file.svg"
        />
      }
      onClick={onClick}
    />
  );
}

export function PortfolioIcon({ onClick }: { onClick: () => void }) {
  return (
    <DesktopIcon
      title="portfolio"
      icon={
        <ThemedIcon
          light="/light/desktop/no-shadow/folder.svg"
          dark="dark/desktop/folder.svg"
        />
      }
      onClick={onClick}
    />
  );
}

// replace the studio_loading icon with the studio icon when studio site is published
export function StudioIcon({ onClick }: { onClick: () => void }) {
  return (
    <DesktopIcon
      title="studio_"
      icon={
        <ThemedIcon
          light="/light/desktop/no-shadow/disc-temp.svg"
          dark="dark/desktop/studio_loading.svg"
        />
      }
      onClick={onClick}
    />
  );
}

export function SettingsIcon({ onClick }: { onClick: () => void }) {
  return (
    <DesktopIcon
      title="settings"
      icon={
        <ThemedIcon
          light="/light/desktop/no-shadow/settings.svg"
          dark="dark/desktop/settings.svg"
        />
      }
      onClick={onClick}
    />
  );
}

export function TicTacIcon({ onClick }: { onClick: () => void }) {
  return (
    <DesktopIcon
      title="tictactoe"
      icon={
        <ThemedIcon
          light="/light/desktop/no-shadow/grid.svg"
          dark="dark/desktop/tictactoe.svg"
        />
      }
      onClick={onClick}
    />
  );
}
