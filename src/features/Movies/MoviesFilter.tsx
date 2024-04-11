import { FilterAltOffOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeywordItem, client } from "../../api/tmdb";
import {
  Autocomplete,
  Button,
  FormControl,
  Paper,
  TextField,
  debounce,
} from "@mui/material";

export interface Filters {
  keywords: KeywordItem[];
}
interface MoviesFilterProps {
  onApplyFilter(filters: Filters): void;
}

export default function MoviesFilter({ onApplyFilter }: MoviesFilterProps) {
  const { handleSubmit, control, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
    },
  });

  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

  const fetchKeywordsOptions = async (query: string) => {
    if (query) {
      setKeywordsLoading(true);

      const options = await client.getKeywords(query);

      setKeywordsLoading(false);
      setKeywordsOptions(options);
    } else {
      setKeywordsOptions([]);
    }
  };

  const fetchKeywordsOptionsDebounced = useMemo(
    () => debounce(fetchKeywordsOptions, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 1 }}>
      <form onSubmit={handleSubmit(onApplyFilter)}>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ m: 2, display: "block" }}
        >
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={(_, value) => onChange(value)}
                onInputChange={(_, value) =>
                  fetchKeywordsOptionsDebounced(value)
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Keywords" />
                )}
              />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          startIcon={<FilterAltOffOutlined />}
          sx={{ m: 2 }}
          disabled={!formState.isDirty}
        >
          Apply filter
        </Button>
      </form>
    </Paper>
  );
}

