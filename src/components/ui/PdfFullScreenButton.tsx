import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Page, Document } from "react-pdf";
import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";

type Props = {
  fileUrl: string;
};

const PdfFullScreenButton = (props: Props) => {
  const { fileUrl } = props;
  const { width, ref } = useResizeDetector();

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [numPages, setNumPages] = React.useState<number>();

  return (
    <Dialog
      open={isFullScreen}
      onOpenChange={(v) => {
        if (!v) setIsFullScreen(v);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsFullScreen(true)}>
        <Button aria-label="fullscreen" variant="ghost" className="gap-1.5">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast.error("Failed to load PDF");
              }}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              file={fileUrl}
              className={"max-h-full"}
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page key={i} pageNumber={i + 1} width={width ? width : 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreenButton;
