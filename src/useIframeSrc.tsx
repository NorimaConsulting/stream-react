import { useMemo } from "react";
import { Preload } from "./types";

interface IframeSrcOptions {
  muted?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  poster?: string;
  adUrl?: string;
  defaultTextTrack?: string;
  preload?: Preload;
}

export function useIframeSrc(
  src: string,
  {
    muted,
    preload,
    loop,
    autoplay,
    controls,
    poster,
    adUrl,
    defaultTextTrack,
  }: IframeSrcOptions
) {
  const paramString = [
    poster && `poster=${encodeURIComponent(poster)}`,
    adUrl && `ad-url=${encodeURIComponent(adUrl)}`,
    defaultTextTrack &&
    `defaultTextTrack=${encodeURIComponent(defaultTextTrack)}`,
    muted && "muted=true",
    preload && `preload=${preload}`,
    loop && "loop=true",
    autoplay && "autoplay=true",
    !controls && "controls=false",
  ]
    .filter(Boolean)
    .join("&");

  // Removed the useMemo hook because it is causing a problem with initial quality of the video.
  // It is still unknown on why this is happening but we know that useMemo() is mainly for 
  // performance optimization that avoids complex functions from re-rendering when they are not intended.
  // See https://reactjs.org/docs/hooks-reference.html#usememo to find out more about useMemo.

  // const iframeSrc = useMemo(
  //   () => `https://iframe.videodelivery.net/${src}?${paramString}`,
  //   // we intentionally do NOT include paramString here because we want
  //   // to avoid changing the URL when these options change. Changes to
  //   // these options will instead be handled separately via the SDK.
  //   []
  // );

  const iframeSrc = `https://iframe.videodelivery.net/${src}?${paramString}`;

  return iframeSrc;
}
