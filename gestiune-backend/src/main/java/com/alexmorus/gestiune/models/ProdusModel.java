/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.alexmorus.gestiune.models;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author alexmorus
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProdusModel {
    public String id;
    public String model;
    public String descriere;
    public String pret;
    public String poza;
    public String stoc;
    public ProducatorModel producator;
    public DistribuitorModel distribuitor;    
    public String denumireProducator;
    public String denumireDistribuitor;
    public String documentIntrare;
    public String idAngajatPreluare;
    public LocalDate dataIntrare;
}
