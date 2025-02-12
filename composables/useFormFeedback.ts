import { reactive } from "vue";

export function useFormFeedback(fields: Record<string, any>) {
  const feedback = reactive({
    field: Object.fromEntries(Object.keys(fields).map(key => [key, undefined as string | undefined])),
    global: {
      isVisible: false as boolean,
      type: "success" as "success" | "error",
      title: undefined as string | undefined,
      description: undefined as string | undefined,
    },
  });

  function resetFeedback() {
    Object.keys(feedback.field).forEach(key => {
      feedback.field[key] = undefined;
    });
    Object.assign(feedback.global, {
      isVisible: false,
      title: undefined,
      description: undefined,
    });
  }

  function setGlobalFeedback(type: "success" | "error", title: string, description: string) {
    feedback.global.isVisible = true;
    feedback.global.type = type;
    feedback.global.title = title;
    feedback.global.description = description;
  }

  return { feedback, resetFeedback, setGlobalFeedback };
}
