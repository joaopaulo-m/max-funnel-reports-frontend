'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createReportDaySchema, type CreateReportDaySchemaType } from "@/schemas/forms/create-report-day";
import { createReportDayAction } from "@/actions/report-day/create";

const CreateReportMonthDayForm = () => {
  const [createReportDayOpen, setCreateReportDayOpen] = useState(false);

  const form = useForm<CreateReportDaySchemaType>({
      resolver: zodResolver(createReportDaySchema),
      defaultValues: {
        month_day: ""
      }
    })
    const { formState: { isSubmitting } } = form;

  async function onSubmit(data: CreateReportDaySchemaType) {
    const result = await createReportDayAction(data);

    if (result.success) {
      toast.success("Dia de relatório criado com sucesso")
    } else {
      toast.error("Erro ao criar dia de relatório", {
        description: result.message
      })
    }

    form.reset()
    setCreateReportDayOpen(false)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)();
  };


  return ( 
    <Dialog open={createReportDayOpen} onOpenChange={setCreateReportDayOpen}>
        <DialogTrigger className="w-fit flex justify-start cursor-pointer" asChild>
          <button
          className="w-fit h-fit flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/25 cursor-pointer"
          type="button"
          >
            <span className="text-xs text-primary font-semibold">Adicionar</span>
            <PlusIcon className="w-3 h-3 text-primary" />
          </button>
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <Form {...form}>
            <form 
              onSubmit={handleFormSubmit}
              className="w-full flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle className="font-bold">Adicionar dia de relatório</DialogTitle>
              </DialogHeader>
                <FormField
                  control={form.control}
                  name="month_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia do mês para envio de relatórios:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <DialogFooter>
                <Button 
                  className="h-12 mt-4" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-fit h-fit flex items-center gap-2">
                      <LoaderCircle className="animate-spin size-3" />
                      <span className="text-sm font-semibold text-white">Enviando</span>
                    </div>
                    ) : (
                      "Adicionar dia"
                    )
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
    </Dialog>  
  );
}

export { CreateReportMonthDayForm };