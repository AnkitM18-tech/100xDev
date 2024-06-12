import { NextFunction, Request, Response } from "express";
import {
  httpRequestDurationMicroseconds,
  requestCounter,
} from "./requestCount";
import { activeRequestsGauge } from "./activeRequests";

/*
export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", function () {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    // Increment request counter
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });
  next();
};
*/

/*
export const cleanupMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  activeRequestsGauge.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
    activeRequestsGauge.dec();
  });
};
*/

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  activeRequestsGauge.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Increment request counter
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });

    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration
    );

    activeRequestsGauge.dec();
  });
  next();
};
