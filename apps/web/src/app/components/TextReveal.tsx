import { Fragment } from "react";

export function TextReveal({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <span className="inline-block" data-word>
              {word}
            </span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
