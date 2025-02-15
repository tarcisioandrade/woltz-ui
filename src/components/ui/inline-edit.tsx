import { cn } from "@/lib/utils";
import * as React from "react";
import { useOnClickOutside } from "@/hooks/use-click-outside";

type InputEditValue = string | number | readonly string[];

export type InputRenderProps = {
  ref: React.RefObject<any>;
  value: InputEditValue;
  onValueChange: (value: string) => void;
  submit: () => void;
  "aria-invalid"?: boolean;
};

export type InlineEditProps = {
  renderInput: (
    props: InputRenderProps,
    error: Error | null
  ) => React.ReactNode;
  renderEdit: (value: InputEditValue) => React.ReactNode;
  onConfirm?: (value: InputEditValue) => Promise<void> | void;
  onCancel?: () => void;
  onError?: (error: Error | null) => void;
  defaultValue?: InputEditValue;
  hideActionButtons?: boolean;
  startWithEditViewOpen?: boolean;
  editDisabled?: boolean;
  editViewFitContainerWidth?: boolean;
} & React.ComponentProps<"div">;

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  (props, ref) => {
    const {
      renderEdit,
      renderInput,
      defaultValue,
      hideActionButtons,
      editDisabled = false,
      startWithEditViewOpen = false,
      editViewFitContainerWidth = false,
      onCancel,
      onError,
      onConfirm,
      ...rest
    } = props;
    const [editMode, setEditMode] = React.useState(startWithEditViewOpen);
    const [value, setValue] = React.useState(defaultValue ?? "");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const closeRef = React.useRef<HTMLDivElement | null>(null);
    const previousValueRef = React.useRef(defaultValue);

    const inputRenderProps: InputRenderProps = {
      ref: inputRef,
      value: value,
      onValueChange: (value) => setValue(value),
      submit: () => onConfirmEdit(),
      "aria-invalid": !!error,
    };

    const turnOffEditMode = React.useCallback(
      function () {
        setValue(previousValueRef.current ?? "");
        setEditMode(false);
        onCancel?.();
        setError(null);
      },
      [onCancel]
    );

    const turnOnEditMode = () => {
      if (editDisabled) return;
      setEditMode(true);
    };

    const onConfirmEdit = React.useCallback(
      async function () {
        if (!value) {
          turnOffEditMode();
          return;
        }
        try {
          if (onConfirm && value !== previousValueRef.current) {
            setIsLoading(true);
            await onConfirm(value);
            setEditMode(false);
          } else {
            setEditMode(false);
          }
          if (value) previousValueRef.current = value;
        } catch (error) {
          onError?.(error as Error);
          setError(error as Error);
        } finally {
          setIsLoading(false);
        }
      },
      [value, onConfirm, onError, turnOffEditMode]
    );

    const onCancelEditEvent = React.useCallback(
      function (ev: KeyboardEvent) {
        const isInputText = inputRef.current?.type === "text";
        if (ev.key === "Escape") turnOffEditMode();
        if (ev.key === "Enter" && isInputText) onConfirmEdit();
      },
      [turnOffEditMode, onConfirmEdit]
    );

    useOnClickOutside(inputRef, onConfirmEdit, [closeRef]);

    function handleBehaviorInput() {
      if (!inputRef?.current) return;
      if (inputRef.current?.type?.startsWith("select")) {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }

    React.useEffect(() => {
      if (editMode) {
        handleBehaviorInput();
        document.addEventListener("keydown", onCancelEditEvent);
        return () => {
          document.removeEventListener("keydown", onCancelEditEvent);
        };
      }
    }, [editMode, onCancelEditEvent, onConfirmEdit]);

    return (
      <div className="w-full" ref={ref} {...rest}>
        {editMode ? (
          <div className="relative">
            {renderInput(inputRenderProps, error)}
            {isLoading ? (
              <div className="absolute top-[50%] right-5 translate-y-[-50%]">
                loading
              </div>
            ) : hideActionButtons ? null : (
              <div
                role="button"
                className="absolute top-[50%] right-0 translate-y-[-50%] text-xs p-2"
                onClick={() => turnOffEditMode()}
                ref={closeRef}
                aria-label="Cancelar edição"
              >
                Cancelar
              </div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "cursor-text relative",
              editDisabled && "pointer-events-none",
              editViewFitContainerWidth && "w-fit"
            )}
            onClick={turnOnEditMode}
            tabIndex={editDisabled ? -1 : 0}
          >
            {renderEdit(value || (previousValueRef.current as string))}
          </div>
        )}
      </div>
    );
  }
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
