import { alpha, type Theme, type Components } from "@mui/material/styles";
import { gray } from "../colors";

export const surfacesCustomizations: Components<Theme> = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4,
        overflow: "clip",
        backgroundColor: (theme.vars || theme).palette.background.default,
        border: "1px solid",
        borderColor: (theme.vars || theme).palette.divider,
        ":before": {
          backgroundColor: "transparent",
        },
        "&:not(:last-of-type)": {
          borderBottom: "none",
        },
        "&:first-of-type": {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        "&:last-of-type": {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: "none",
        borderRadius: 8,
        "&:hover": { backgroundColor: gray[50] },
        "&:focus-visible": { backgroundColor: "transparent" },
        ...theme.applyStyles("dark", {
          "&:hover": { backgroundColor: gray[800] },
        }),
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: "none" },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          padding: 16,
          gap: 16,
          transition: "all 100ms ease",
          backgroundColor: gray[50],

          ...theme.applyStyles("dark", {
            backgroundColor: gray[800],
          }),
          variants: [
            {
              props: {
                variant: "outlined",
              },
              style: {
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: "none",
                backgroundColor: gray[50],
                // background: "hsl(0, 0%, 100%)",
                ...theme.applyStyles("dark", {
                  background: alpha(gray[900], 0.4),
                }),
              },
            },
          ],
        };
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        "&:last-child": { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  // MuiListItem: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       position: "relative",
  //       padding: "5px 10px",
  //       margin: "6px 0",
  //       borderRadius: 10,
  //       background: alpha(theme.palette.background.paper, 0.6),
  //       backdropFilter: "blur(12px)",
  //       // border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
  //       border: `none`,
  //       boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
  //       transition: "all 0.25s ease-in-out",
  //       cursor: "pointer",

  //       "&:hover": {
  //         transform: "translateY(-2px)",
  //         boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
  //         background: alpha(theme.palette.primary.light, 0.15),
  //       },

  //       "&:active": {
  //         transform: "scale(0.98)",
  //         boxShadow: `inset 0 2px 6px ${alpha(
  //           theme.palette.common.black,
  //           0.25
  //         )}`,
  //       },

  //       "&.Mui-selected": {
  //         background: alpha(theme.palette.primary.main, 0.2),
  //         border: `1px solid ${theme.palette.primary.main}`,
  //         boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
  //         "&:hover": {
  //           background: alpha(theme.palette.primary.main, 0.25),
  //         },
  //       },

  //       "& .MuiListItemIcon-root": {
  //         minWidth: 40,
  //         color: theme.palette.primary.main,
  //         transition: "transform 0.25s ease",
  //       },

  //       "&:hover .MuiListItemIcon-root": {
  //         transform: "scale(1.1) rotate(5deg)",
  //       },

  //       "& .MuiListItemText-primary": {
  //         fontWeight: 600,
  //         fontSize: "1rem",
  //         color: theme.palette.text.primary,
  //       },

  //       "& .MuiListItemText-secondary": {
  //         fontSize: "0.875rem",
  //         color: theme.palette.text.secondary,
  //       },

  //       ...theme.applyStyles("dark", {
  //         background: alpha(gray[900], 0.6),
  //         border: `1px solid ${alpha(gray[700], 0.4)}`,
  //         "&:hover": {
  //           background: alpha(theme.palette.primary.dark, 0.2),
  //         },
  //       }),
  //     }),
  //   },
  // },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        padding: "8px 15px",
        margin: "6px 0",
        borderRadius: 10,
        backdropFilter: "blur(12px)",
        transition: "all 0.25s ease-in-out",

        ...theme.applyStyles("dark", {
          border: "none",
          "&:hover": {
            background: alpha(theme.palette.primary.dark, 0.2),
          },
        }),

        "&.Mui-selected": {
          backgroundColor: "transparent",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "transparent",
        },
        "&:active": {
          backgroundColor: "transparent",
        },
        "&:hover .MuiListItemIcon-root": {
          transform: "scale(1.1) rotate(5deg)",
        },
      }),
    },
  },
};
