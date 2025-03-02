import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const BearcatModel = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const init = () => {
      if (rendererRef.current) {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        rendererRef.current.dispose();
      }

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a12);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 3);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
      frontLight.position.set(0, 1, 5);
      frontLight.castShadow = true;
      scene.add(frontLight);

      const rightLight = new THREE.DirectionalLight(0xffffff, 0.6);
      rightLight.position.set(5, 1, 0);
      scene.add(rightLight);

      // 添加小星星点缀背景
      addStarsToScene(scene);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 3;

      const bearcat = createCuteBearcatModel();
      scene.add(bearcat);

      const clock = new THREE.Clock();

      const animate = () => {
        const time = clock.getElapsedTime();

        // 呼吸
        const breathScale = 1 + Math.sin(time * 1.5) * 0.08;
        bearcat.userData.body.scale.set(breathScale, breathScale, breathScale);

        // 头部摆动
        bearcat.userData.head.rotation.y = Math.sin(time * 0.8) * 0.35;
        bearcat.userData.head.rotation.z = Math.sin(time * 0.7) * 0.2;

        // 耳朵摆动
        bearcat.userData.leftEar.rotation.z = Math.PI / 6 + Math.sin(time * 1.2) * 0.25;
        bearcat.userData.rightEar.rotation.z = -Math.PI / 6 + Math.sin(time * 1.2) * 0.25;

        // 手臂摆动
        bearcat.userData.leftArmGroup.rotation.x = Math.sin(time * 2) * 0.7;
        bearcat.userData.leftArmGroup.rotation.z = Math.sin(time * 1.5) * 0.3;

        bearcat.userData.rightArmGroup.rotation.x = -Math.sin(time * 2) * 0.7;
        bearcat.userData.rightArmGroup.rotation.z = -Math.sin(time * 1.5) * 0.3;

        // 尾巴摇摆
        bearcat.userData.tail.rotation.z = Math.sin(time * 3) * 0.7;

        controls.update();
        renderer.render(scene, camera);

        frameIdRef.current = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!canvasRef.current) return;

        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    const addStarsToScene = (scene) => {
      const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let i = 0; i < 30; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        const x = THREE.MathUtils.randFloatSpread(30);
        const y = THREE.MathUtils.randFloatSpread(30);
        const z = THREE.MathUtils.randFloatSpread(30) - 15; // 让星星在背景
        star.position.set(x, y, z);
        scene.add(star);
      }
    };

    const createCuteBearcatModel = () => {
      const createSmoothEggBody = () => {
        const bodyGeometry = new THREE.SphereGeometry(0.8, 64, 48);
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

        // 整体非均匀缩放，拉长垂直方向，略微收缩水平方向
        body.scale.set(1.0, 1.3, 0.9);

        const positions = bodyGeometry.attributes.position;

        for (let i = 0; i < positions.count; i++) {
          // 顶点位置
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z = positions.getZ(i);

          // 平滑的变形因子
          // 将y值从[-1,1]映射到[0,1]，中间点的值最大，顶部和底部值较小
          const t = (y + 1) / 2;

          let newX = x;
          let newZ = z;

          // 顶部到中部的过渡（t从1到0.5）
          if (t > 0.5) {
            // 上半部分收缩控制，t=1时最窄，t=0.5时正常
            const topTaper = 0.6 + 0.4 * (1 - t) * 2;
            newX *= topTaper;
            newZ *= topTaper;
          }
          // 中部到底部的过渡（t从0.5到0）
          else {
            // 下半部分先膨胀后收缩
            // 创建一个在t≈0.25处最大的膨胀因子
            const bulgeFactor = 4 * t * (0.5 - t); // 在t=0.25时最大
            newX *= 1.0 + 0.2 * bulgeFactor; // 最大膨胀20%

            // 底部偏平处理（t接近0时）
            if (t < 0.2) {
              // 平滑过渡到扁平底部
              const flatFactor = 0.9 + 0.5 * t; // 从0.9（t=0）到1.0（t=0.2）
              newZ *= flatFactor;
            }
          }

          positions.setX(i, newX);
          positions.setZ(i, newZ);
        }

        // 顶点位置改变，重新计算法线
        bodyGeometry.computeVertexNormals();

        body.material.flatShading = false;
        body.material.shininess = 60;

        body.position.set(0, -0.8, 0);
        return body;
      }

      const bearcatGroup = new THREE.Group();

      // 材质
      const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        specular: 0x111111,
        shininess: 30,
        flatShading: false
      });

      const darkMaterial = new THREE.MeshPhongMaterial({
        color: 0x444444,
        specular: 0x111111,
        shininess: 30
      });

      // 头部
      const headGeometry = new THREE.SphereGeometry(1, 32, 32);
      const head = new THREE.Mesh(headGeometry, bodyMaterial);
      head.position.set(0, 0.5, 0);
      bearcatGroup.add(head);

      // 鼻吻
      const snoutGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      snoutGeometry.scale(1, 0.8, 1.2);
      const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
      snout.position.set(0, -0.3, 0.9); // 向下移动，露出眼睛
      head.add(snout);

      // 鼻尖
      const noseGeometry = new THREE.ConeGeometry(0.2, 0.2, 3);
      const nose = new THREE.Mesh(noseGeometry, darkMaterial);
      nose.position.set(0, -0.1, 0.5);
      nose.rotation.x = Math.PI / 2; // 旋转使三角形朝向正确
      nose.rotation.z = Math.PI; // 调整朝向
      snout.add(nose);

      // 眼睛
      const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 16);
      eyeGeometry.scale(1, 1.5, 0.5);

      const leftEye = new THREE.Mesh(eyeGeometry, darkMaterial);
      leftEye.position.set(-0.5, 0.2, 0.85); // Y值上调，确保在鼻子上方
      leftEye.rotation.y = -Math.PI / 10;
      head.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, darkMaterial);
      rightEye.position.set(0.5, 0.2, 0.85); // Y值上调，确保在鼻子上方
      rightEye.rotation.y = Math.PI / 10;
      head.add(rightEye);

      // 耳朵
      const earGeometry = new THREE.SphereGeometry(0.4, 32, 16);
      earGeometry.scale(0.8, 1, 0.3);

      const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
      leftEar.position.set(-0.7, 0.8, -0.1);
      leftEar.rotation.z = Math.PI / 6;
      leftEar.rotation.y = -Math.PI / 12;
      head.add(leftEar);

      const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
      rightEar.position.set(0.7, 0.8, -0.1);
      rightEar.rotation.z = -Math.PI / 6;
      rightEar.rotation.y = Math.PI / 12;
      head.add(rightEar);

      // 身体
      const body = createSmoothEggBody();
      bearcatGroup.add(body);

      // 手臂
      const armGeometry = new THREE.CapsuleGeometry(0.2, 0.4, 8, 8);

      const leftArmGroup = new THREE.Group();
      leftArmGroup.position.set(-0.6, 0.3, 0);
      body.add(leftArmGroup);

      const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
      leftArm.position.set(-0.3, 0, 0.2);
      leftArm.rotation.z = -Math.PI / 3;
      leftArm.rotation.y = Math.PI / 8;
      leftArmGroup.add(leftArm);

      const rightArmGroup = new THREE.Group();
      rightArmGroup.position.set(0.6, 0.3, 0);
      body.add(rightArmGroup);

      const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
      rightArm.position.set(0.3, 0, 0.2);
      rightArm.rotation.z = Math.PI / 3;
      rightArm.rotation.y = -Math.PI / 8;
      rightArmGroup.add(rightArm);

      // 尾巴
      const tailGeometry = new THREE.SphereGeometry(0.2, 16, 8);
      tailGeometry.scale(1, 1, 1.2);
      const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
      tail.position.set(0, -1.3, -0.8);
      bearcatGroup.add(tail);

      // 保存引用用于动画
      bearcatGroup.userData = {
        head,
        leftEar,
        rightEar,
        body,
        leftArmGroup,
        rightArmGroup,
        leftArm,
        rightArm,
        tail
      };

      return bearcatGroup;
    };

    // 初始化场景
    const cleanupFn = init();

    // 组件卸载时清理
    return () => {
      if (cleanupFn) cleanupFn();
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl h-96 rounded-lg overflow-hidden shadow-lg">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default BearcatModel;