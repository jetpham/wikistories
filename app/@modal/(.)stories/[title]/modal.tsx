"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  console.log("modal");

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute top-0 left-0 bottom-0 right-0">
      <dialog
        ref={dialogRef}
        onClose={onDismiss}
        className="bg-black/70 h-full w-full m-0 p-0 max-w-none max-h-none inset-0 fixed flex items-center justify-center"
      >
        {children}
        <button
          className="absolute top-4 right-4 cursor-pointer "
          onClick={onDismiss}
        >
          <X color="#ffffff" className="size-10" />
        </button>
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
