import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import {
  useGetDisposQuery,
  useUpdateDispoMutation,
} from "../../../services/DisponibilityServices";
import EmptyData from "../../common/EmptyData";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface DispoTableProps {
  edit: boolean;
}

const DispoTable: React.FC<DispoTableProps> = ({ edit }) => {
  const { data, isLoading, error } = useGetDisposQuery();
  const [updateDispo] = useUpdateDispoMutation();
  const { showSnackbar } = useSnackbar();

  // ✅ State par ligne
  const [form, setForm] = useState<{
    [key: number]: { start: Date; end: Date };
  }>({});

  // Initialize form values from API
  useEffect(() => {
    if (data) {
      const initial = data.reduce((acc, d) => {
        acc[d.id!] = {
          start: new Date(`2000-01-01T${d.start_time}`),
          end: new Date(`2000-01-01T${d.end_time}`),
        };
        return acc;
      }, {} as any);

      setForm(initial);
    }
  }, [data]);

  const handleUpdate = async (id: number) => {
    const { start, end } = form[id];

    try {
      await updateDispo({
        id,
        start_time: start.toTimeString().slice(0, 8),
        end_time: end.toTimeString().slice(0, 8),
      }).unwrap();

      showSnackbar("Créneau mis à jour ✅", "success");
    } catch (err: any) {
      showSnackbar(
        err?.data?.detail || "Erreur pendant la mise à jour ❌",
        "error"
      );
    }
  };

  if (isLoading) return <CircularProgress />;

  if (error) showSnackbar("Erreur de chargement ⚠️", "error");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {data?.length === 0 ? (
          <EmptyData />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Début</TableCell>
                  <TableCell>Fin</TableCell>
                  {edit && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.id}</TableCell>

                    <TableCell>
                      {edit ? (
                        <TimePicker
                          ampm={false}
                          value={form[d.id!]?.start}
                          onChange={(value) =>
                            setForm({
                              ...form,
                              [d.id!]: { ...form[d.id!], start: value! },
                            })
                          }
                        />
                      ) : (
                        d.start_time
                      )}
                    </TableCell>

                    <TableCell>
                      {edit ? (
                        <TimePicker
                          ampm={false}
                          value={form[d.id!]?.end}
                          minTime={form[d.id!]?.start}
                          onChange={(value) =>
                            setForm({
                              ...form,
                              [d.id!]: { ...form[d.id!], end: value! },
                            })
                          }
                        />
                      ) : (
                        d.end_time
                      )}
                    </TableCell>

                    {edit && (
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleUpdate(d.id!)}
                        >
                          Enregistrer
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default DispoTable;
