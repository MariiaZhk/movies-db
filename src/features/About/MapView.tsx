import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { addPopupToMapWidget, createMapWidget } from "./mapWidget";
import { Map } from "leaflet";
import { createPortal } from "react-dom";
import { Favorite } from "@mui/icons-material";

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(
    null
  );
  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <Container ref={containerRef} sx={{ width: 850, height: 600, my: 2 }}>
      {popupContainer && (
        <PortalContainer popupContainer={popupContainer}>
          <Greeting />
        </PortalContainer>
      )}
    </Container>
  );
}

function PortalContainer({
  popupContainer,
  children,
}: {
  popupContainer: HTMLElement;
  children: React.ReactNode;
}) {
  return createPortal(children, popupContainer);
}

function Greeting() {
  return (
    <Box>
      <Typography>Greetings from Ukraine!</Typography>
      <Favorite sx={{ color: "#0056B9" }}></Favorite>
      <Favorite sx={{ color: "#FFD800" }}></Favorite>
    </Box>
  );
}

