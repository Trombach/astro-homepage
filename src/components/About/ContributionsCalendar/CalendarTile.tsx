import {
  FloatingArrow,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import clsx from "clsx";
import { useRef, useState } from "react";

type Props = {
  contributions: number;
  date: Date;
};

export default function CalendarTile({ contributions, date }: Props) {
  const arrowRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={clsx(
          contributions === 0 && "bg-slate-300 dark:bg-slate-900",
          contributions > 0 && contributions <= 5 && "bg-green-950",
          contributions > 5 && contributions <= 10 && "bg-green-900",
          contributions > 10 && contributions <= 15 && "bg-green-800",
          contributions > 15 && contributions <= 25 && "bg-green-600",
          contributions > 25 && "bg-green-400",
          "size-2 rounded-sm transition-transform hover:scale-150 lg:size-3 xl:size-4",
        )}
        {...getReferenceProps()}
      />
      {showTooltip && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="rounded-full bg-accent px-3 py-1"
        >
          <FloatingArrow
            className="fill-accent"
            ref={arrowRef}
            context={context}
          />

          {`${
            contributions > 1
              ? `${contributions} contributions`
              : contributions === 1
                ? `${contributions} contribution`
                : "No contributions"
          } on ${date.toLocaleDateString()}`}
        </div>
      )}
    </>
  );
}
