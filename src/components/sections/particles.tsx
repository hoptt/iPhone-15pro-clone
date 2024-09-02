"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import React, { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

export default function ParticlesSection() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    key: "basic",
    name: "Basic",
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
        },
      },
      color: {
        value: "#ff0000",
        animation: {
          enable: true,
          speed: 20,
          sync: true,
        },
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: {
          min: 1,
          max: 2,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 200,
        },
        push: {
          quantity: 4,
        },
      },
    },
    background: {
      color: "#000000",
    },
    detectRetina: true,
  };

  return (
    <section className="relative h-[100vh] text-white flex flex-col justify-center items-center gap-10">
      <div className="z-[-1] h-full absolute top-0 left-0 w-full bg-black">
        {init && <Particles id="tsparticles" options={options} />}
      </div>
      <div>particle</div>
    </section>
  );
}
